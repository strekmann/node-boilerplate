#!/usr/bin/env node

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import errorHandler from 'errorhandler';
import express from 'express';
import http from 'http';
import expressBunyan from 'express-bunyan-logger';
import path from 'path';
import socketIO from 'socket.io';
import passportSocketIO from 'passport.socketio';
import config from 'config';
import serveStatic from 'serve-static';
import connectRedis from 'connect-redis';

import passport from './server/lib/passport';
import api from './server/api';
import universal from './server/app';
import socketRoutes from './server/socket';
import log from './server/lib/logger';
import './server/lib/db';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;
const io = socketIO(httpServer, { path: '/s' });

if (config.get('express.trust_proxy')) {
    app.enable('trust proxy');
}

app.use(cookieParser(config.get('session.cookiesecret')));

if (config.util.getEnv('NODE_ENV') !== 'test') {
    const bunyanOpts = {
        logger: log,
        excludes: ['req', 'res', 'req-headers', 'res-headers'],
    };
    app.use(expressBunyan(bunyanOpts));
    app.use(expressBunyan.errorLogger(bunyanOpts));
}
else {
    app.use(errorHandler({
        dumpExceptions: true,
        showStack: true,
    }));
    app.use(session({
        secret: 'testing-secret',
        resave: config.get('session.resave'),
        saveUninitialized: config.get('sessopn.saveUninitialized'),
    }));
}

const RedisStore = connectRedis(session);
const redisStoreOpts = config.get('redis');
redisStoreOpts.ttl = config.get('session.ttl') / 1000;
const sessionStore = new RedisStore(redisStoreOpts);

app.use(session({
    store: sessionStore,
    secret: config.get('session.secret'),
    name: config.get('session.name'),
    resave: config.get('session.resave'),
    saveUninitialized: config.get('session.saveUninitialized'),
    rolling: config.get('session.rolling'),
    cookie: {
        maxAge: config.get('session.ttl'),
    },
}));

const socketOptions = {
    store: sessionStore,
    key: config.get('session.name'),
    secret: config.get('session.secret'),
    cookieParser,
    success: (data, accept) => {
        log.debug('successful auth');
        accept();
    },
    fail: (data, message, error, accept) => {
        log.debug('auth failed', message);
        accept(new Error(message));
    },
};
io.use(passportSocketIO.authorize(socketOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(passport.initialize());
app.use(passport.session());

/** Socket.io routes **/
socketRoutes(io);

/** Authentication stuff **/
app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'],
        }), (req, res) => {});
app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
            const url = req.session.returnTo || '/';
            delete req.session.returnTo;
            res.redirect(url);
        });
app.post('/auth/login', passport.authenticate('local'), (req, res, next) => {
    res.format({
        html: () => {
            res.redirect('/');
        },
        json: () => {
            res.json(_.pick(req.user, 'id','name'));
        },
    });
});

app.get('/auth/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

/** API endpoints **/
app.use('/api/1/auth', api.auth);

/** Static stuff **/
app.use(serveStatic(path.join(__dirname, '..', 'dist', 'public')));

/** Universal app endpoint **/
app.get('*', universal);

app.use((err, req, res, next) => {
    log.error(err);
    res.format({
        html: () => {
            res.sendStatus(500);
        },
        json: () => {
            res.status(500).json({
                error: err.message,
            });
        },
    });
});

process.on('uncaughtException', (err) => {
    log.fatal(err);
    process.exit(1);
});

httpServer.listen(port, () => {
    log.info('port %s, env=%s', port, config.util.getEnv('NODE_ENV'));
});