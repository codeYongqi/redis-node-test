const faker = require('faker');
const { performance } = require('perf_hooks');
const { redisClient } = require('../client');
const util = require('util');

redisClient.set = util.promisify(redisClient.set);
redisClient.get = util.promisify(redisClient.get);
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

  for(let i = 250001; i <= 260000; i++) {
    console.log(i);
    let data = geneTargetData();

    let start = performance.now();
    await redisClient.set(i, data);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonData = async function findStringJsonData() {
  let cost = 0;
  for(let i = 250001; i <= 260000; i++) {
    console.log(i);
    let start = performance.now();
    let data = await redisClient.get(i);
    let end = performance.now();
    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const findJsonOneField = async function findOneFieldInJsonData() {
  let cost = 0;
  for(let i = 250001; i <= 260000; i++) {
    console.log(i);
    let start = performance.now();
    let data = await redisClient.get(i);
    data = JSON.parse(data).url;
    let end = performance.now();
    cost += end - start;
    console.log(data);
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

async function updateField(i) {
  return new Promise((reslove, reject) => {
    redisClient.watch(i, (err) => {
        if (err) reject(err);
        redisClient.get(i, (err, res) => {
          if (err) reject(err);
          let data = JSON.parse(res);
          data.url = faker.internet.url();
          // data.url = 'test';
          redisClient.multi()
          .set(i, JSON.stringify(data))
          .exec((err, reply) => {
            if (err) reject(err);
            reslove(reply);
          })
        })
    })
  })
}

const updateJson = async function updateOneFileInJson() {
  let cost = 0;
  for(let i = 250001; i <= 260000; i++) {
    console.log(i);

    let start = performance.now();
    await updateField(i);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

const deleteJson = async function deleteJsonData() {
  let cost = 0;
  for(let i = 250001; i <= 260000; i++) {
    console.log(i);

    let start = performance.now();
    await redisClient.del(i);
    let end = performance.now();
    cost += end - start;
  }
  console.log(`it cost ${cost} thrillseconds`);
  console.log(`average cost ${(cost)/10000 } thrillseconds`);
}

// insertJsonData();
// findJsonData();
// findJsonOneField();
// updateJson();
 deleteJson();



