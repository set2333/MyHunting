//Работа с сессиями
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

var redis_client = redis.createClient();
redis_client.on('error', function (err) {
    console.log("Error client.on");
});

const _session = session({
    secret: 'testSecretKey',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: redis_client,
        ttl: 260
    }),
    saveUninitialized: false,
    resave: false
})

module.exports = _session;
