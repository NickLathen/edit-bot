const fs = require('fs');
const responseController = require('./db/controllers/responseController.js');
const triggerController = require('./db/controllers/triggerController.js');
const interpretationController = require('./db/controllers/interpretationController.js');

function removeWhitespace(text) {
  while (text[0] === ' ') {
    text = text.slice(1);
  }
  while (text[text.length - 1] === ' ') {
    text = text.slice(0, text.length - 1);
  }
  return text;
}

setTimeout(function() {
  const dumpString = fs.readFile('/Users/lathenn/Documents/edit-bot/dumps/feb9.txt', function(err, data) {
    var interpretations = data.toString().split('\n').map(rows => rows.split('$$$').map(entries => entries.split(',')));
    interpretations.forEach(function(interpretation) {
      var triggerArray = interpretation[0];
      var responseArray = interpretation[1];
      var interpretationId;
      triggerArray = triggerArray.map(removeWhitespace);
      responseArray = responseArray.map(removeWhitespace);
      
      triggerController.addTrigger('new', 'new', triggerArray[0], function(trigger) {
        interpretationId = trigger.interpretationId;

        triggerArray.forEach(function(trigger, index) {
          if (index > 0) {
            triggerController.addTrigger(interpretationId, 'new', trigger, ()=>{});
          }
        });
        responseArray.forEach(function(response) {
          responseController.addResponse(interpretationId, 'new', response, ()=>{});
        });
      });
    });
  });
}, 1000);