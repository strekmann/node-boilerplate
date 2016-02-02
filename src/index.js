#!/usr/bin/env node

import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import moment from 'moment';
import path from 'path';
import socketIO from 'socket.io';
import passportSocketIO from 'passport.socketio';
import config from 'config';
import serveStatic from 'serve-static';

import api from './server/api';
import universal from './server/app';
import socketRoutes from './server/socket';
import log from './server/lib/logger';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;
const io = socketIO(httpServer);

io.path('/s');
const socketOptions = _.assign(congif.session, {
    success: (data, accept) => {
        log.debug('successful auth');
        accept();
    },
    fail: (data, message, error, accept) => {
        log.debug('auth failed', message);
        accept(new Error(message));
    },
});
io.use(passportSocketIO.authorize(socketOptions));

app.use(serveStatic(path.join(__dirname, '..', 'dist', 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*** API endpoints ***/
app.use('/api/1/auth', api.auth);

/*** Socket.io routes ***/
socketRoutes(io);

/*** Universal app endpoint ***/
app.get('*', universal);

process.on('uncaughtException', (err) => {
    log.fatal(err);
    process.exit(1);
})

httpServer.listen(port, () => {
    log.info('port %s, env=%s', port, config.util.getEnv('NODE_ENV'));
});
