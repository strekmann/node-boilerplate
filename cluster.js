#!/usr/bin/env node

var http = require('http'),
    fs = require('fs'),
    cluster = require('cluster'),
    numCPU = Math.floor(require('os').cpus().length / 2),
    env = process.env.NODE_ENV || 'development',
    i = 0,
    stamp = new Date().getTime(),
    logfile;

if (fs.exists('./server/settings.js')) {
    logfile = require('./server/settings').logfile;
}

// Make sure we always have at least 2 workers.
if (numCPU < 2) { numCPU = 2; }

// We only need 2 workers in development mode.
if (env === 'development') { numCPU = 2; }

// Set up logging
if (logfile){
    var winston = require('winston');
    winston.add(winston.transports.File, {filename: logfile, timestamp: true}).remove(winston.transports.Console);

    var $out = process.stdout.write,
        $err = process.stderr.write;

    process.stdout.write = function(buffer){
        winston.info(buffer);
        $out.call(process.stdout, buffer);
    };

    process.stderr.write = function(buffer){
        winston.warn(buffer);
        $err.call(process.stderr, buffer);
    };
}

if (cluster.isMaster){
    for (i; i<numCPU; i++){
        cluster.fork();
    }

    cluster.on('fork', function(worker){
        console.info('* forked worker %s', worker.process.pid);
    });

    cluster.on('exit', function(worker, code, signal){
        console.info('# worker %s died [%s]. Spawning new!', worker.process.pid, code);
        cluster.fork();
    });
} else {
    // -- database
    var mongoose = require('mongoose'),
        app = require('./server/app'),
        settings = app.conf;

    app.db = mongoose.connect(settings.mongo.servers.join(','), {replSet: {rs_name: settings.mongo.replset}});
    app.stamp = stamp;

    // -- handle node exceptions
    process.on('uncaughtException', function(err){
        console.error(new Date().toString(), 'uncaughtException', err.message);
        console.error(err.stack);
        process.exit(1);
    });

    // -- start server
    http.createServer(app).listen(app.conf.port, function(){
        console.log("Express server listening on port %d in %s mode", app.conf.port, app.settings.env);
    });
}
