const redis = require("redis");
const redisearch = require('redis-redisearch');

redisearch(redis);
const redisClient= redis.createClient();

redisClient.on("error", function(error) {
  console.error(error);
});

module.exports = { redisClient } 