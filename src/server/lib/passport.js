var User = require('../models').User,
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            if (err) {
                return done(err.message, null);
            }
            if (!user) {
                // User not found, tell passport user is not valid
                return done(null, false);
            }
            done(null, user);
        });
    });

    if (app.conf.auth.google) {
        passport.use(new GoogleStrategy({
                clientID: app.conf.auth.google.clientId,
                clientSecret: app.conf.auth.google.clientSecret,
                callbackURL: app.conf.auth.google.callbackURL
            },
            function(accessToken, refreshToken, profile, done) {
                process.nextTick(function () {
                    User.findOne({google_id: profile.id}, function(err, user){
                        if (err) {
                            return done(err.message, null);
                        }
                        if (user) {
                            return done(null, user);
                        }
                        else {
                            user = new User({
                                name: profile.displayName,
                                email: profile._json.email,
                                google_id: profile.id
                            });
                            user.save(function(err){
                                if (err) {
                                    return done("Could not create user", null);
                                }
                                return done(null, user);
                            });
                        }
                    });
                });
            }
        ));
    }

    return passport;
};