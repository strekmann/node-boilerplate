import redis from 'redis';

const client = redis.createClient();

if (process.env.NODE_ENV === "test") {
    client.select(1);
}
module.exports = client;
