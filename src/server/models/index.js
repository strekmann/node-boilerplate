import mongoose from 'mongoose';
import shortid from 'shortid';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true, unique: true, default: shortid.generate },
    username: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    is_active: { type: Boolean, default: true },
    is_admin: { type: Boolean, default: false },
    created: { type: Date, required: true, default: Date.now },
    google_id: { type: String },
});

UserSchema.pre('save', function generatePassword(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    if (user.password.length < 8) {
        return next(new Error('Password must be at least 8 characters long'));
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

UserSchema.set('toObject', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});

UserSchema.set('toJSON', {
    versionKey: false,
    transform: (document, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
    },
});

module.exports = {
    User: mongoose.model('User', UserSchema),
};
