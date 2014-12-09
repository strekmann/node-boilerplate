var mongoose = require('mongoose'),
    settings = {};

try {
    settings = require('../settings');
} catch(e) {}

settings.mongo = settings.mongo || {servers: ['localhost'], replSet: null};
var db = mongoose.connect(settings.mongo.servers.join(','), {replSet: {rs_name: settings.mongo.replset}});
module.exports = db;

