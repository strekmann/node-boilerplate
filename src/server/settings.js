var path = require('path');

var translation_directory = path.join(__dirname, '..', 'public', 'locale');

module.exports = {
    siteName: 'boilerplate',
    uri: 'http://localhost:3000/',
    sessionSecret: 'sessionSecretString',
    auth: {
        google: {
            clientId: '731786785790-qt9ov6ep7khgssnvg47gl4rrhbha2nv1.apps.googleusercontent.com',
            clientSecret: 'o_boz7biMwmoUru2CizFDDoX',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        }
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    },
        mongo: {
        servers: ['mongodb://localhost/test'],
        replset: null
    },
    i18n: {
        languages: ['nb','en'],
        default_language: 'nb',
        translation_directory: translation_directory
    }
};

/* secret gen: cat /dev/urandom| base64 | fold -w 64 */
