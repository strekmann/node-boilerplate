// express middleware
var moment = require('moment'),
    Iso = require('iso'),
    React = require('react'),
    alt = require('../../react/alt');

module.exports.ensureAuthenticated = function(req, res, next) {
    // Simple route middleware to ensure user is authenticated.
    //   Use this route middleware on any resource that needs to be protected.  If
    //   the request is authenticated (typically via a persistent login session),
    //   the request will proceed.  Otherwise, the user will be redirected to the
    //   login page.
    if (req.isAuthenticated()) { return next(); }
    req.session.returnTo = req.url;
    res.redirect('/');
};

module.exports.addRenderReact = function (req, res, next) {
    res.renderReact = function (page, data) {
        moment.locale(req.lang);

        var element = require('../../react/pages/' + page + '.jsx');

        alt.bootstrap(JSON.stringify(data));
        var html = Iso.render(React.renderToString(React.createElement(element, {lang: req.lang})), alt.flush(), {react: true});

        res.render('react',{
            html: html,
            page: page
        });
    };
    next();
};
