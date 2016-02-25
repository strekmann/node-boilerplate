import fetch from 'isomorphic-fetch';

let base = '';

if (typeof __CLIENT__ === 'undefined') {
    const config = require('config');
    base = config.get('express.apiurl');
}

export default (url, options) => {
    // Move cookie option into headers if present
    if (options.cookie) {
        options.headers = options.headers || {};
        options.headers.cookie = options.cookie;
        delete options.cookie;
    }

    const opts = Object.assign({}, {
        method: 'get',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }, options);

    // some routes should be allowed at root, but default should be to
    // use api + version
    let baseurl = base;
    let fullurl = url;
    if (!opts.root) {
        baseurl += '/api/1';
    }

    if (!fullurl.match(/^https?:/)) {
        fullurl = baseurl + fullurl;
    }

    // check status and return promise
    return fetch(fullurl, opts).then(res => {
        const json = res.json();
        if (res.status >= 200 && res.status < 300) {
            return json;
        }
        return json.then(Promise.reject.bind(Promise));
    });
};
