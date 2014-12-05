var bunyan = require('bunyan'),
    util = require('util');

var opts = {name:'unnamed'};
var logger;


module.exports = function(config){
    if (logger){ return logger; }

    var override = false;
    opts = config || opts;

    if (opts.overrideConsole){
        override = true;
        delete opts['overrideConsole'];
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

module.exports.getLogger = function(){ return logger; };
