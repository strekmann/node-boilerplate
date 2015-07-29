#!/usr/bin/env node

var http = require('http'),
    util = require('util'),
    _ = require('lodash'),
    logger = require('./server/lib/logger'),
    db = require('./server/lib/db'),
    moment = require('moment'),
    env = process.env.NODE_ENV || 'development',
    i = 0;

settings = {
    useBunyan: false,
    environment: env,
    overrideConsole: true,
    bunyan: {
        name: require('./package').name,
        level: env === 'development' ? 'debug' : 'info',
        serializers: logger.defaultSerializers
    }
};

try {
    var server_settings = require('./server/settings');
    settings = _.assign(settings, server_settings);
} catch(e) {}

var log = logger.init(settings);


var app = require('./server/app');
app.db = db;
app.stamp = moment().format('YYMMDDHHmm');

// -- handle node exceptions
process.on('uncaughtException', function(err){
    log.fatal(err.message);
    log.fatal(err.stack);
    process.exit(1);
});

// -- start server
http.createServer(app).listen(app.conf.port, function(){
    log.info("Listening to port %s, env=%s, stamp=%s", app.conf.port, app.settings.env, app.stamp);
});
