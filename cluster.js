#!/usr/bin/env node

var http = require('http'),
    fs = require('fs'),
    cluster = require('cluster'),
    util = require('util'),
    _ = require('underscore'),
    logger = require('./server/lib/logger'),
    db = require('./server/lib/db'),
    numCPU = Math.floor(require('os').cpus().length / 2),
    env = process.env.NODE_ENV || 'development',
    i = 0,
    stamp = new Date().getTime(),
    settings = {};

try {
    settings = require('./server/settings');
} catch(e) {}

if (settings.useBunyan){
    var bunyan = require('bunyan');
    var logOpts = {
        name: require('./package').name,
        overrideConsole: true,
        serializers: {
            res: function(res){
                if (!_.isObject(res)) { return res; }
                return {
                    statusCode: res.statusCode,
                    header: res._header
                };
            },
            req: function(req){
                if (!_.isObject(req)) { return req; }

                var connection = req.connection || {};
                return {
                    method: req.method,
                    url: req.url,
                    headers: req.headers,
                    remoteAdress: connection.remoteAddress,
                    remotePort: connection.remotePort
                };
            }
        }
    };
    if (env === 'development'){ logOpts.level = 'debug'; }
}
var log = logger(logOpts);

// Make sure we always have at least 2 workers.
if (numCPU < 2) { numCPU = 2; }

// We only need 2 workers in development mode.
if (env === 'development') { numCPU = 2; }

if (cluster.isMaster){
    for (i; i<numCPU; i++){
        cluster.fork();
    }

    cluster.on('fork', function(worker){
        log.info('* forked worker %s', worker.process.pid);
    });

    cluster.on('exit', function(worker, code, signal){
        log.info('# worker %s died [%s]. Spawning new!', worker.process.pid, code);
        cluster.fork();
    });
} else {
    var app = require('./server/app');
    app.db = db;
    app.stamp = stamp;

    // -- handle node exceptions
    process.on('uncaughtException', function(err){
        log.fatal(err.message);
        log.fatal(err.stack);
        process.exit(1);
    });

    // -- start server
    http.createServer(app).listen(app.conf.port, function(){
        log.info("Express server listening on port %d in %s mode", app.conf.port, app.settings.env);
    });
}
