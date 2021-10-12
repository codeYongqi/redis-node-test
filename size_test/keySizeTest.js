const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util')

redisClient.json_set = util.promisify(redisClient.json_set);
redisClient.json_get = util.promisify(redisClient.json_get);
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

  for(let i = 1; i <= 10000; i++) {
    console.log(i);
    let data = geneTargetData();
    let key = String(i*10).padStart(1024, '0');

    let start = performance.now();
    await redisClient.json_set(key, '.', data);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let cost = 0;

  for(let i = 1; i <= 10000; i++) {
    console.log(i);
    let key = String(i*10).padStart(1024, '0');

    let start = performance.now();
    let data = await redisClient.json_get(key, '.url');
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
    let key = String(i*10).padStart(1024, '0');

    let start = performance.now();
    await redisClient.del(key);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const updateJson = async function updateOneFileInJson() {
  let cost = 0;
  for(let i = 1; i <= 10000; i++) {
    console.log(i);
    let key = String(i*10).padStart(1024, '0');

    let url = faker.internet.url();
    let start = performance.now();
    await redisClient.json_set(key, '.url', JSON.stringify(url));
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}
 insertJsonData();
// findJsonData();

// del();
// updateJson();