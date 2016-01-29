var mongoose = require('mongoose'),
    shortid = require('shortid');

var UserSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, 'default': shortid.generate},
    username: {type: String, unique: true, sparse: true, trim: true, lowercase: true},
    name: {type: String, required: true},
    email: {type: String},
    password: {type: String},
    is_active: {type: Boolean, 'default': true},
    is_admin: {type: Boolean, 'default': false},
    created: {type: Date, required: true, 'default': Date.now},
    google_id: {type: String}
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
};
