#!/usr/bin/env node

var cluster = require('cluster'),
    _ = require('lodash'),
    settings = {numWorkers: 2},
    i = 0;

try {
    var server_settings = require('./server/settings');
    settings = _.assign(settings, server_settings);
} catch(e){}

if (cluster.isMaster){
    for (i; i<settings.numWorkers; i++){
        cluster.fork();
    }

    cluster.on('fork', function(worker){
        console.info('* forked worker %s', worker.process.pid);
    });

    cluster.on('exit', function(worker, code, signal){
        console.info('# worker %s died [%s] (%s). Spawning new!', worker.process.pid, code, signal);
    });
}
else {
    require('./index');
}
