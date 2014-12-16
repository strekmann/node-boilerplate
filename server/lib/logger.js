var bunyan,
    util = require('util'),
    fs = require('fs'),
    settings = {};

try {
    settings = require('../settings');
} catch(e) {}

var logger;

if (settings.useBunyan && process.env.NODE_ENV !== 'test'){
    var bunyan = require('bunyan');

    var opts = {name:'unnamed'};


    module.exports = function(config){
        if (logger){ return logger; }

        var override = false;
        opts = config || opts;

        if (opts.overrideConsole){
            override = true;
            delete opts.overrideConsole;
        }

        logger = bunyan.createLogger(opts);

        if (override){
            var consoleLog = logger.child({console: true});
            console.log   = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
            console.debug = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
            console.info  = function(){ consoleLog.info (null, util.format.apply(this, arguments)); };
            console.warn  = function(){ consoleLog.warn (null, util.format.apply(this, arguments)); };
            console.error = function(){ consoleLog.error(null, util.format.apply(this, arguments)); };
        }

        return logger;
    };

} else {
    module.exports = function(config){
        logger = console;
        logger.fatal = console.error;
        logger.child = function(){
            return logger;
        };
        return logger;
    };
}

module.exports.getLogger = function(){ return logger; };
