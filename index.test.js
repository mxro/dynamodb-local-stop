
const dynamoDbLocal = require('dynamo-db-local');
const { execSync } = require("child_process");

jest.setTimeout(60000);

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

it('Should start and stop DynamoDB Local', async () => {

  console.log('Containers before start');
  console.log(execSync('docker container ls').toString());
  
  const dynamoDbLocalProcess = dynamoDbLocal.spawn({command: 'docker', path: null});
  console.log('DynamoDB Local process started. Waiting for Docker container to spin up ...');

  await sleep(10000);

  dynamoDbLocalProcess.kill();
  console.log('DynamoDB Local process stopped');

  console.log('Containers after stop');
  console.log(execSync('docker container ls').toString());


});