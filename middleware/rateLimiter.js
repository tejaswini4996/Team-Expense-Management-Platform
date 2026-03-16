const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { redisClient } = require('../config/redis');

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

const authLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'auth_rl:'
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

module.exports = { limiter, authLimiter };