const redis = require("redis");
const redisearch = require('redis-redisearch');
const rejson = require('redis-rejson');

// use redis-search module
redisearch(redis);
rejson(redis);
const redisClient= redis.createClient();

redisClient.on("error", function(error) {
  console.error(error);
});

module.exports = { redisClient } 
