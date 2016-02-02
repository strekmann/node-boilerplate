/* eslint no-param-reassign: 0 */

import passport from 'passport';
import LocalStrategy from 'passport-local';

import {User} from '../models';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId, (err, user) => {
        if (err) {
            return done(err.message, null);
        }
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    });
});

passport.passportLocal = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        email = email.toLowerCase();

        User.findOne({email: email}, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Unknown user with email ' + email }); }

            user.authenticate(password, (err, ok) => {
                if (err) { return done(err); }
                if (ok) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Invalid password' });
            });
        });
    }
);

passport.use(passport.passportLocal);
export default passport;
