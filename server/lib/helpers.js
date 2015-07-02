var Iso = require('iso'),
    React = require('react'),
    alt = require('../react/alt');

module.exports.react2html = function(element, data){
    alt.bootstrap(JSON.stringify(data));
    return Iso.render(React.renderToString(React.createElement(element)), alt.flush(), {react: true});
};

module.exports.renderReact = function(res, page, data){
    var element = require('../react/pages/' + page + '.jsx');

    alt.bootstrap(JSON.stringify(data));
    var html = Iso.render(React.renderToString(React.createElement(element)), alt.flush(), {react: true});

    res.render('react',{
        html: html,
        page: page
    });
};
