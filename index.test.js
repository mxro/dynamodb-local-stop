
const dynamoDbLocal = require('dynamo-db-local');
const { execSync } = require("child_process");

jest.setTimeout(240000);

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

  await sleep(60000);

  console.log('Containers after start');
  console.log(execSync('docker container ls').toString());

  await new Promise((resolve) => {
    dynamoDbLocalProcess.stdout.once('end', () => resolve());
    dynamoDbLocalProcess.kill();
  });

  console.log('DynamoDB Local process stopped');

  console.log('Containers after stop');
  console.log(execSync('docker container ls').toString());
});