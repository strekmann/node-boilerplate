var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    db = require('./lib/db'),
    log = require('./lib/logger')(),
    package = require('../package'),
    settings = {};

require('node-jsx').install({extension: '.jsx'});

try {
    settings = require('./settings');
} catch(ignore) {}

if (!settings.session_name){
    settings.session_name = package.name || 'connect.sid';
}

var app = require('libby')(express, settings, db);

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
    res.locals.active_user = req.user;
    res.locals.stamp = app.stamp;
    next();
});

// ## Application routes

// Authentication against google.
app.get('/auth/google', app.passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}), function(req, res){});
app.get('/auth/google/callback', app.passport.authenticate('google', { failureRedirect: '/login' }), function(req, res){
    var url = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(url);
});

// Core routes like index, login, logout and account.
app.use('/', require('./routes/index'));

// Static file middleware serving static files.
app.use(express.static(path.join(__dirname, '..', 'public')));

// Internal server error - 500 status
app.use(function(err, req, res, next){
    log.error(err);

    res.status(500);
    res.format({
        html: function(){
            res.render('500', {
                error: err.message,
                status: err.status || 500
            });
        },

        json: function(){
            res.status(500).json({
                error: err.message,
                status: err.status || 500
            });
        }
    });
});

// File not found - 404 status
app.use(function(req, res, next){
    res.status(404);
    res.format({
        html: function(){
            res.render('404', {
                status: 404,
                error: 'file not found',
                url: req.url
            });
        },

        json: function(){
            res.status(404).json({
                status: '404',
                error: 'file not found',
                url: req.url
            });
        }
    });
});

// Export application.
module.exports = app;
