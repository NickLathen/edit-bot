const interpretation = require('../models/interpretation.js');
const response = require('../models/response.js');

module.exports = {
  getAll: function getAll(cb) {
    response.findAll({}).then(function(data) {
      cb(data);
    });
  },

  addResponse: function addResponse(interpretationId, responseId, text, cb) {
    if (interpretationId === 'new') {
      interpretation.create().then(function(instance) {
        interpretationId = instance.dataValues.id;
        response.create({interpretationId: interpretationId, text: text}).then(function(instance) {
          cb(instance);
        });
      });
    } else if (responseId === 'new') {
      response.create({interpretationId: interpretationId, text: text}).then(function(instance) {
        cb(instance);
      });
    } else {
      response.update(
        { text: text },
        { where: { id: responseId } }
      ).then(function() {
        cb();
      });
    }
  }
};