import fetch from 'isomorphic-fetch';

let base = '';

if (typeof __CLIENT__ === 'undefined') {
    const config = require('config');
    base = config.get('express.apiurl');
}

export default (url, options) => {
    // some routes should be allowed at root, but default should be to
    // use api + version
    if (!options.root) {
        base += '/api/1';
    }

    if (!url.match(/^https?:/)) {
        url = base + url;
    }

    const opts = Object.assign({}, {
        method: 'get',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }, options);

    return fetch(url, opts);
};
