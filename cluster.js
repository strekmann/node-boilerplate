#!/usr/bin/env node

var http = require('http'),
    fs = require('fs'),
    cluster = require('cluster'),
    util = require('util'),
    bunyan = require('bunyan'),
    logger = require('./server/lib/logger'),
    numCPU = Math.floor(require('os').cpus().length / 2),
    env = process.env.NODE_ENV || 'development',
    i = 0,
    stamp = new Date().getTime();


// Logging
var logOpts = {
    name: 'app',
    overrideConsole: true,
    serializers: {
        req: bunyan.stdSerializers.req
    }
};
if (env === 'development'){ logOpts.level = 'debug'; }
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
    // -- database
    var mongoose = require('mongoose'),
        app = require('./server/app'),
        settings = app.conf;
    settings.mongo = settings.mongo || {servers: ['localhost'], replSet: null};

    app.db = mongoose.connect(settings.mongo.servers.join(','), {replSet: {rs_name: settings.mongo.replset}});
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
