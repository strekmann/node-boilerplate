import 'es6-promise';
import fetch from 'isomorphic-fetch';

let base = '';

if (typeof __CLIENT__ === 'undefined') {
    const config = require('config');
    base = config.get('express.apiurl');
}

export default (url, options) => {
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

    console.error("will fetch", url, opts);

    return fetch(url, opts);
};
