const express = require('express');
const app = express();
const bodyParser = require('./bodyParser.js');
const port = 9999;
const appDirectory = __dirname.slice(0, __dirname.length - 7); //base app directory

const mockData = require(appDirectory + '/test/mockInterpretations.js');

app.use(bodyParser);
app.use(express.static(appDirectory + '/client'));

app.get('/', (request, response) => {
  response.sendFile(appDirectory + '/client/src/index.html');
});

app.get('/api/interpretations', (request, response) => {
  response.send(JSON.stringify(mockData));
});

app.post('/api/responses', (request, response) => {
  response.send(200);
});

app.post('/api/triggers', (request, response) => {
  response.send(200);
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});