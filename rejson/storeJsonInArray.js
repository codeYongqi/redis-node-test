const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util')

redisClient.json_set = util.promisify(redisClient.json_set);
redisClient.json_get = util.promisify(redisClient.json_get);
redisClient.json_arrappend = util.promisify(redisClient.json_arrappend);

redisClient.del = util.promisify(redisClient.del);

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
  return JSON.stringify(target);
}

const insertJsonData = async function insertJsonDataByString() {
  let cost = 0;

  for(let i = 1; i <= 1000; i++) {
    console.log(i);
    let data = geneTargetData();
    let key = `target_arr: ${i}`

    let start = performance.now();
    await redisClient.json_set(key, '.', '[]');

    for (let index = 0; index < 10; index++) {
      await redisClient.json_arrappend(key,'.',data);
    }

    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/1000 } thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let cost = 0;

  for(let i = 1; i <= 10000; i++) {
    console.log(i);
    let key = `target_arr: ${i}`

    let start = performance.now();
    let data = await redisClient.json_get(key, '.');
    let end = performance.now();
    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const del = async function insertJsonDataByString() {
  let cost = 0;

  for(let i = 1; i <= 10000; i++) {
    console.log(i);
    let key = `target_arr: ${i}`

    let start = performance.now();
    await redisClient.del(key);
    let end = performance.now();

    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}


// insertJsonData();
 findJsonData();
// del();
