var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    React = require('react'),
    User = require('../models').User,
    ensureAuthenticated = require('../lib/middleware').ensureAuthenticated;

router.get('/logout', function(req, res, next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.route('/account')
    .all(ensureAuthenticated)
    .put(function(req, res, next){
        User.findById(req.user._id, function(err, user){
            if (err) {
                return res.status(404).json({
                    error: 'Could not find user'
                });
            }

            req.assert('user.username', 'username is required').notEmpty();
            req.assert('user.name', 'name is required').notEmpty();
            req.assert('user.email', 'valid email required').isEmail();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).json({
                    errors: errors
                });
            }

            user.username = req.body.user.username;
            user.name = req.body.user.name;
            user.email = req.body.user.email;
            user.save(function(err){
                if (err) { return next(err); }

                return res.json({user});
            });
        });
    });

module.exports = router;
