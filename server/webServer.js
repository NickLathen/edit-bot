const express = require('express');
const app = express();
const bodyParser = require('./bodyParser.js');
const compression = require('compression');
const port = 9999;
const appDirectory = __dirname.slice(0, __dirname.length - 7); //base app directory
const responseController = require('./db/controllers/responseController.js');
const triggerController = require('./db/controllers/triggerController.js');
const interpretationController = require('./db/controllers/interpretationController.js');

app.use(compression());
app.use(bodyParser);
app.use(express.static(appDirectory + '/client'));

app.get('/', (request, response) => {
  response.sendFile(appDirectory + '/client/src/index.html');
});

app.get('/api/interpretations', (request, response) => {
  responseController.getAll(function(responses) {
    triggerController.getAll(function(triggers) {
      const interpretationsMap = {};
      const interpretations = [];
      responses.forEach(function(botResponse) {
        if (!interpretationsMap[botResponse.interpretationId]) {
          interpretationsMap[botResponse.interpretationId] = {id: botResponse.interpretationId, responses: [], triggers: []};
        }
        interpretationsMap[botResponse.interpretationId].responses.push({id: botResponse.id, text: botResponse.text});
      });
      triggers.forEach(function(trigger) {
        if (!interpretationsMap[trigger.interpretationId]) {
          interpretationsMap[trigger.interpretationId] = {id: trigger.interpretationId, responses: [], triggers: []};
        }
        interpretationsMap[trigger.interpretationId].triggers.push({id: trigger.id, text: trigger.text});
      });
      for (var key in interpretationsMap) {
        interpretations.push(interpretationsMap[key]);
      }
      response.send(JSON.stringify(interpretations));
    });
  });
});

app.post('/api/responses', (request, response) => {
  const body = request.body;
  const interpretationId = body.interpretationId;
  const responseId = body.responseId;
  const text = body.text;
  responseController.addResponse(interpretationId, responseId, text, function() {
    response.sendStatus(200);
  });
});

app.delete('/api/responses', (request, response) => {
  const body = request.body;
  const interpretationId = body.interpretationId;
  const responseId = body.responseId;
  responseController.deleteResponse(interpretationId, responseId, function() {
    response.sendStatus(200);
  });
});

app.post('/api/triggers', (request, response) => {
  const body = request.body;
  const interpretationId = body.interpretationId;
  const triggerId = body.triggerId;
  const text = body.text;
  triggerController.addTrigger(interpretationId, triggerId, text, function() {
    response.sendStatus(200);
  });
});

app.delete('/api/triggers', (request, response) => {
  const body = request.body;
  const interpretationId = body.interpretationId;
  const triggerId = body.triggerId;
  triggerController.deleteTrigger(interpretationId, triggerId, function() {
    response.sendStatus(200);
  });
});

app.delete('/api/interpretations', (request, response) => {
  const body = request.body;
  const interpretationId = body.interpretationId;
  interpretationController.deleteInterpretation(interpretationId, function() {
    response.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});