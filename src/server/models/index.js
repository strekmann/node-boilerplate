import mongoose from 'mongoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true, 'default': shortid.generate},
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, lowercase: true, required: true},
    email_verified: {type: Boolean, default: false},
});

UserSchema.pre('save', function generatePassword(next) {
    var user = this;
    if (!user.isModified('password')) { return next(); }
    if (user.password.length < 4) {
        return next(new Error('Password must be at least 4 characters long'));
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) { return next(err); }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.authenticate = function authenticateUser(candidate, next) {
    bcrypt.compare(candidate, this.password, (err, ok) => {
        next(err, ok);
    });
};

const User = mongoose.model('User', UserSchema);

export { User };
