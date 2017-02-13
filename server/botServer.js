var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var myId = '';
let channelIdLookup = {};
const responseController = require('./db/controllers/responseController.js');
const triggerController = require('./db/controllers/triggerController.js');
const interpretationController = require('./db/controllers/interpretationController.js');
let botDatabase;
let memeTimeout = Date.now();

var botToken = require('./../config/keys').botToken;

var rtm = new RtmClient(botToken);

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload if you want to cache it
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
  myId = rtmStartData.self.id;
});

// you need to wait for the client to fully connect before you can send messages
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  for (let key in rtm.dataStore.channels) {
    const channel = rtm.dataStore.channels[key];
    channelIdLookup[channel.name] = channel.id;
  }
  rtm.on(CLIENT_EVENTS.RTM.RAW_MESSAGE, function(message) {
    message = JSON.parse(message);
    if (message.type && message.type === 'message' && message.text !== '' && message.user !== myId && message.subtype !== 'bot_message' && message.subtype !== 'slackbot_response') {
      if (message.text.indexOf('memestop') >= 0) {
        memeTimeout = Date.now() + 15 * 60 * 1000;
        rtm.sendMessage('Shutting up for 15 minutes, sorry :(', message.channel);
      } else if (message.text.indexOf('memego') >= 0) {
        memeTimeout = Date.now();
        rtm.sendMessage('... computing dank memes!', message.channel);
      } else if (Date.now() > memeTimeout) {
        respondTo(message);
      }
    }
  });
});

function respondTo(message) {
  triggerController.getAll(function(triggers) {
    triggers = triggers.filter(function(trigger) {
      return message.text.indexOf(trigger.text) >= 0 && trigger.text !== ''; 
    });
    if (triggers.length > 0) {
      const randomTrigger = triggers[Math.floor(Math.random() * triggers.length)];
      responseController.getAll(function(responses) {
        responses = responses.filter(function(response) {
          return response.interpretationId === randomTrigger.interpretationId;
        });
        if (responses.length > 0) {
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          memeTimeout = Date.now() + 15 * 1000;
          rtm.sendMessage(randomResponse.text, message.channel);
        }
      });
    } 
  });
}

rtm.start();