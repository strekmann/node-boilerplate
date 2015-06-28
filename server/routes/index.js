var express = require('express'),
    router = express.Router(),
    React = require('react'),
    renderReact = require('../lib/helpers').renderReact,
    User = require('../models').User,
    ensureAuthenticated = require('../lib/middleware').ensureAuthenticated;

router.get('/', function(req, res, next){
    var element = require('../react/pages/home.jsx');
    var data = {
        // SomeStore: {items: items}
    };

    res.render('react', {
        html: renderReact(element, data),
        page: 'homepage'
    });
});

router.get('/2', function(req, res, next){
    var element = require('../react/pages/second.jsx');
    var data = {
        // SomeStore: {items: items}
    };

    res.render('react', {
        html: renderReact(element, data),
        page: 'secondpage'
    });
});

router.get('/foundation', function(req, res, next){
    res.render('foundation');
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
        res.render('account');
    })
    .put(function(req, res, next){
        User.findById(req.user._id, function(err, user){
            if (err) {
                return res.json(404, {
                    error: 'Could not find user'
                });
            }

            req.assert('username', 'username is required').notEmpty();
            req.assert('name', 'name is required').notEmpty();
            req.assert('email', 'valid email required').isEmail();

            var errors = req.validationErrors();
            if (errors) {
                return res.json('200', {
                    errors: errors
                });
            }

            user.username = req.body.username;
            user.name = req.body.name;
            user.email = req.body.email;
            return user.save(function(err){
                if (err) { next(err); }

                return res.json(200, {
                    message: 'Changes saved'
                });
            });
        });
    });

module.exports = router;
