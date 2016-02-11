import config from 'config';
import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'test') {
    mongoose.connect('mongodb://localhost/mocha_test');
}
else {
    const servers = config.mongodb.servers || ['localhost'];
    const replset = config.mongodb.replset || null;
    mongoose.connect(servers.join(','), { replSet: { rs_name: replset } });
}
