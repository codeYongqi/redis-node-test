const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util');

redisClient.set = util.promisify(redisClient.set);
redisClient.get = util.promisify(redisClient.get);

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
  let start = performance.now();

  for(let i = 250001; i <= 260001; i++) {
    console.log(i);
    let data = geneTargetData();
    // await redisClient.set(i, data);
  }

  let end = performance.now();
  console.log(`it cost ${end - start} thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let start = performance.now();
  for(let i = 250001; i <= 260000; i++) {
    console.log(i);
    let data = await redisClient.get(i);
    console.log(data);
  }
  let end = performance.now();
  console.log(`it cost ${end - start} thrillseconds`);
  console.log(`average cost ${(end - start)/10000 } thrillseconds`);
}

// insertJsonData();
findJsonData();



