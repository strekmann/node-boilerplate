import fetch from 'isomorphic-fetch';

let base = '';

if (typeof __CLIENT__ === 'undefined') {
    const config = require('config');
    base = config.get('express.apiurl');
}

export default (url, options) => {
    const opts = Object.assign({}, {
        method: 'get',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }, options);

    // some routes should be allowed at root, but default should be to
    // use api + version
    let baseurl = base;
    if (!opts.root) {
        baseurl += '/api/1';
    }

    if (!url.match(/^https?:/)) {
        url = baseurl + url;
    }

    // check status and return promise
    return fetch(url, opts).then(res => {
        const json = res.json();
        if (res.status >= 200 && res.status < 300) {
            return json;
        }
        return json.then(Promise.reject.bind(Promise));
    });
};
