const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util');

redisClient.hset = util.promisify(redisClient.hset);
redisClient.hget = util.promisify(redisClient.hget);
redisClient.hgetall = util.promisify(redisClient.hgetall);

const geneTargetData = function generateTargetDataByFaker() {
  let target = {};
  target.filePath = faker.system.filePath();
  target.hostname = faker.internet.userName();
  target.ip = faker.internet.ip();
  target.domain = faker.internet.domainName();
  target.url = faker.internet.url();
  target.filename = faker.system.fileName();
  target.mailbox = faker.internet.email();
  target.messageSubject = faker.random.word();
  target.messageId = String(faker.datatype.number());
  return target;
}

const insertJsonData = async function insertJsonDataByString() {
  let start = performance.now();

  for(let i = 280001; i <= 290001; i++) {
    console.log(i);
    let data = geneTargetData();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        await redisClient.hset(i, key, element); 
      }
    }
  }

  let end = performance.now();
  console.log(`it cost ${end - start} thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let start = performance.now();
  for(let i = 280001; i <= 290000; i++) {
    console.log(i);
    let data = await redisClient.hgetall(i);
    console.log(data);
  }
  let end = performance.now();
  console.log(`it cost ${end - start} thrillseconds`);
  console.log(`average cost ${(end - start) / 10000 } thrillseconds`);
}

findJsonData();

// insertJsonData();

