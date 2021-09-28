const redis = require("redis");
const redisearch = require('redis-redisearch');
const rejson = require('redis-rejson');

redisearch(redis);
rejson(redis);
const redisClient= redis.createClient();

redisClient.on("error", function(error) {
  console.error(error);
});

module.exports = { redisClient } 