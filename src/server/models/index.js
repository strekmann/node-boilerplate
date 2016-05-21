import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    is_active: { type: Boolean, default: true },
    is_admin: { type: Boolean, default: false },
    google_id: { type: String },
    created: { type: Date, required: true, default: Date.now },
});

UserSchema.pre('save', function generatePassword(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    if (user.password.length < 8) {
        return next(new Error('Password must be at least 8 characters long'));
    }

    return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        return bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            return next();
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
