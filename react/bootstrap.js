var Iso = require('iso'),
    React = require('react'),
    alt = require('./alt'),
    moment = require('moment');

module.exports = function(module){
    if (typeof window !== 'undefined'){
        // If we have window, we're in the browser. Bootstrap time!

        moment.locale(document.documentElement.getAttribute('lang'));

        Iso.bootstrap(function(state, meta, container){
            alt.bootstrap(state);
            React.render(React.createElement(module), container);
        });
    }
};
