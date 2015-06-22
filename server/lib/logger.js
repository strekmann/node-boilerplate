var util = require('util'),
    _ = require('lodash');

var _logger = null;

function getConsoleLogger(){
    var logger = console;
    logger.fatal = console.error;
    logger.child = function(){
        return logger;
    };
    return logger;
}

module.exports = function(){
    if (_logger === null){
        console.warn("Logger not initialized! Using console fallback.");
        return getConsoleLogger();
    }
    return _logger;
};

module.exports.init = function(config){
    if (_logger){ return _logger; }

    if (config.useBunyan && config.environment !== 'test'){
        var bunyan = require('bunyan');

        var opts = { name: 'unnamed' };

        if (config && config.bunyan){
            opts = _.assign(opts, config.bunyan);
        }
        _logger = bunyan.createLogger(opts);

        if (config && config.overrideConsole){
            var consoleLog = logger.child({console: true});
            console.log   = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
            console.debug = function(){ consoleLog.debug(null, util.format.apply(this, arguments)); };
            console.info  = function(){ consoleLog.info (null, util.format.apply(this, arguments)); };
            console.warn  = function(){ consoleLog.warn (null, util.format.apply(this, arguments)); };
            console.error = function(){ consoleLog.error(null, util.format.apply(this, arguments)); };
        }
        return _logger;
    }
    else {
        _logger = getConsoleLogger();
        return _logger;
    }
};

module.exports.defaultSerializers = {
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
};
