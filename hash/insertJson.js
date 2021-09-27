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
  let cost = 0;

  for(let i = 280001; i <= 290001; i++) {
    console.log(i);
    let data = geneTargetData();

    let start = performance.now();
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        await redisClient.hset(i, key, element); 
      }
    }
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let cost = 0;
  for(let i = 280001; i <= 290000; i++) {
    console.log(i);
    let start = performance.now();
    let data = await redisClient.hgetall(i);
    let end = performance.now();
    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonOneField = async function findOneFieldInJsonData() {
  let cost = 0;
  for(let i = 280001; i <= 290000; i++) {
    console.log(i);

    let start = performance.now();
    let data = await redisClient.hget(i, 'url');
    let end = performance.now();

    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const updateJson = async function updateOneFileInJson() {
  let cost = 0;
  for(let i = 280001; i <= 290000; i++) {
    console.log(i);

    let url = faker.internet.url();

    let start = performance.now();
    await redisClient.hset(i,'url', url);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}


const deleteJson = async function deleteJsonData() {
  let cost = 0;
  for(let i = 280001; i <= 290000; i++) {
    console.log(i);

    let start = performance.now();
    await redisClient.del(i);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

//  insertJsonData();
// findJsonData();
// findJsonOneField();
// updateJson();
 deleteJson();

