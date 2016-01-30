import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { RouterContext, match } from "react-router";
import reducers from '../common/reducers/user';
import path from 'path';
import fs from 'fs';
import db from './lib/db';
import middleware from './lib/middleware';
import logger from './lib/logger';
import routes from "../common/routes";
import pkg from '../../package';

const log = logger();
let settings = {};

try {
    settings = require('./settings');
} catch(ignore) {}

if (!settings.session_name){
    settings.session_name = pkg.name || 'connect.sid';
}

const app = require('libby')(express, settings, db);

// # Application setup

// Set up bunyan logger
if (settings.useBunyan){
    var express_bunyan = require('express-bunyan-logger');
    var bunyan_opts = {
        logger: log,
        excludes: ['req', 'res', 'req-headers', 'res-headers']
    };
    if (app.settings.env === 'development' || app.settings.env === 'production'){
        app.use(express_bunyan(bunyan_opts));
        app.use(express_bunyan.errorLogger(bunyan_opts));
    }
}

// Add passport to application.
app.passport = require('./lib/passport')(app);

if (app.settings.env === 'development'){
    // pretty print jade html in development
    app.locals.pretty = true;
}

// Use jade templates located under server/views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Initialize passport
app.use(app.passport.initialize());
app.use(app.passport.session());

// Make some variables always available in templates.
app.use(function(req, res, next){
    res.locals.stamp = app.stamp;
    next();
});

// Initialize local data
app.use((req, res, next) => {
    res.locals.data = Immutable.Map({
        viewer: Immutable.fromJS(req.user),
        formErrors: Immutable.Map(),
        errorMessage: '',
        isSaving: false,
    });
    next();
});

// ## Application routes

// Authentication against google.
app.get('/auth/google', app.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}), function(req, res){});
app.get('/auth/google/callback', app.passport.authenticate('google', { failureRedirect: '/' }), function(req, res){
    var url = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(url);
});

// Static file middleware serving static files.
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

// Core routes like index, login, logout and account.
app.use('/', require('./routes/index'));

app.use((req, res, next) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            return next(err);
            //res.status(500).send(err.message);
        }
        else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }
        else if (renderProps) {
            const initialState = res.locals.data;
            const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
            const store = createStoreWithMiddleware(reducers, initialState);

            const html = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const markup = `
                <!doctype html>
                <html>
                    <head>
                        <meta charset="utf-8" />
                        <title>Boilerplate</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link href="/styles.css" rel="stylesheet" />
                    </head>
                    <body>
                        <div id="main">${html}</div>
                        <script>
                            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                        </script>
                        <script src="/client.js"></script>
                    </body>
                </html>
                `;
            res.send(markup);
        }
        else {
            res.status(404).send("Not found");
        }
    });
});

app.use((err, req, res, next) => {
    log.error(err);
    log.error(err.stack);

    res.format({
        html: () => {
            res.status(500).render('500', {
                error: err.message,
                status: err.status || 500,
            });
        },

        json: () => {
            res.status(500).json({
                error: err.message,
                status: err.status || 500,
            });
        },
    });
});

// File not found - 404 status
app.use((req, res, next) => {
    res.format({
        html: () => {
            res.status(404).render('404', {
                error: 'file not found',
            });
        },

        json: () => {
            res.status(404).json({
                error: 'file not found',
            });
        },
    });
});

export default app;
