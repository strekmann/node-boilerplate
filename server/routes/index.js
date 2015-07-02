var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    React = require('react'),
    renderReact = require('../lib/helpers').renderReact,
    User = require('../models').User,
    ensureAuthenticated = require('../lib/middleware').ensureAuthenticated;

router.get('/', function(req, res, next){
    var data = {
        UserStore: {
            user: {
                name: 'Testulf',
                email: 'test@ulf.no'
            }
        }
    };

    renderReact(res, 'home', data);
});

router.get('/login', function(req, res, next){
    res.render('login');
});

router.get('/logout', function(req, res, next){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.route('/account')
    .all(ensureAuthenticated)
    .get(function(req, res, next){
        var data = {
            UserStore: {
                user: req.user
            }
        };

        renderReact(res, 'account', data);
    })
    .put(function(req, res, next){
        User.findById(req.user._id, function(err, user){
            if (err) {
                return res.status(404).json({
                    error: 'Could not find user'
                });
            }

            req.assert('username', 'username is required').notEmpty();
            req.assert('name', 'name is required').notEmpty();
            req.assert('email', 'valid email required').isEmail();

            var errors = req.validationErrors();
            if (errors) {
                return res.status(400).json({
                    errors: errors
                });
            }

            user.username = req.body.username;
            user.name = req.body.name;
            user.email = req.body.email;
            user.save(function(err){
                if (err) { next(err); }

                return res.json(user);
            });
        });
    });

module.exports = router;
