/* eslint no-param-reassign: 0 */

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import { User } from '../models';
import config from 'config';

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

        User.findOne({ email }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: `Unknown user with email ${email}`,
                });
            }

            user.authenticate(password, (authErr, ok) => {
                if (authErr) { return done(authErr); }
                if (ok) {
                    return done(null, user);
                }
                return done(null, false, { message: 'Invalid password' });
            });
        });
    }
);

if (config.auth.google) {
    passport.use(new GoogleStrategy({
        clientID: config.auth.google.clientId,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            User.findOne({ google_id: profile.id }, (err, user) => {
                if (err) {
                    return done(err.message, null);
                }
                if (user) {
                    return done(null, user);
                }
                user = new User({
                    name: profile.displayName,
                    email: profile._json.email,
                    google_id: profile.id,
                });
                user.save((saveErr) => {
                    if (saveErr) {
                        return done('Could not create user', null);
                    }
                    return done(null, user);
                });
            });
        });
    }));
}

passport.use(passport.passportLocal);
export default passport;
