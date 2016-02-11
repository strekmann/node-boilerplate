module.exports = {
    bunyan: {
        level: 'debug',
        name: 'boilerplate'
    },
    express: {
        port: 3000,
        trust_proxy: false,
        apiurl: 'http://localhost:3000',
        apiversion: '0'
    },
    session: {
        secret: 'sessionsecret',
        cookiesecret: 'cookiesecret',
        name: 's7n.sid',
        saveUninitialized: false,
        rolling: false,
        resave: false,
        ttl: 86400000
    },
    redis: {
        host: 'localhost',
        port: 6379,
        pass: undefined
    },
    mongodb: {
        servers: ['mongodb://localhost/test'],
        replset: null
    },
    auth: {
        google: {
            clientId: 'GoogleAppId',
            clientSecret: 'GoogleAppSecret',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
    }
};
