const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util');

redisClient.hset = util.promisify(redisClient.hset);
redisClient.hget = util.promisify(redisClient.hget);
redisClient.hgetall = util.promisify(redisClient.hgetall);
redisClient.del = util.promisify(redisClient.del);

const geneTargetData = function generateTargetDataByFaker() {
  let target = {};
  let i = Math.floor(Math.random() * 9);
  console.log(i);
  switch (i) {
    case 0:
      target.filePath = faker.system.filePath();
    break;

    case 1:
      target.messageId = String(faker.datatype.number());
    break;

    case 2:
      target.messageSubject = faker.random.word();
    break;

    case 3:
      target.mailbox = faker.internet.email();
    break;

    case 4:
      target.filename = faker.system.fileName();
    break;

    case 5:
      target.url = faker.internet.url();
    break;

    case 6:
      target.domain = faker.internet.domainName();
    break;

    case 7:
      target.ip = faker.internet.ip();
    break;

    case 8:
      target.hostname = faker.internet.userName();
    break;
  }
  return target;
}

const insertJsonData = async function insertJsonDataByString() {
  let cost = 0;

  for(let i = 400000; i <= 600000; i++) {
    console.log(i);
    let data = geneTargetData();
    console.log(data);

    let start = performance.now();
    await redisClient.hset(`target:${i}`, 'value', JSON.stringify(data)); 
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

insertJsonData();