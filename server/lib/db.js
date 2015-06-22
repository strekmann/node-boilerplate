var mongoose = require('mongoose'),
    settings = {},
    db;

try {
    settings = require('../settings');
} catch(e) {}


if (process.env.NODE_ENV === 'test'){
    db = mongoose.connect('mongodb://localhost/mocha_test');
}
else {
    settings.mongo = settings.mongo || {servers: ['localhost'], replSet: null};
    var db = mongoose.connect(settings.mongo.servers.join(','), {replSet: {rs_name: settings.mongo.replset}});
}

module.exports = db;
