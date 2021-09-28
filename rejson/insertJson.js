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

  for(let i = 350001; i <= 360000; i++) {
    console.log(i);
    let data = geneTargetData();

    let start = performance.now();
    await redisClient.json_set(i, '.', data);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let cost = 0;

  for(let i = 350001; i <= 360000; i++) {
    console.log(i);
    let start = performance.now();
    let data = await redisClient.json_get(i,'.url');
    let end = performance.now();
    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const del = async function insertJsonDataByString() {
  let cost = 0;

  for(let i = 350001; i <= 360000; i++) {
    console.log(i);

    let start = performance.now();
    await redisClient.del(i);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const updateJson = async function updateOneFileInJson() {
  let cost = 0;
  for(let i = 350001; i <= 360000; i++) {
    console.log(i);

    let url = faker.internet.url();
    let start = performance.now();
    await redisClient.json_set(i, '.url', JSON.stringify('test'));
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}
// insertJsonData();
// findJsonData();

 del();
// updateJson();