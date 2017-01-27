const interpretation = require('../models/interpretation.js');
const trigger = require('../models/trigger.js');

module.exports = {
  getAll: function getAll(cb) {
    trigger.findAll({}).then(function(data) {
      cb(data);
    });
  },

  addTrigger: function addTrigger(interpretationId, triggerId, text, cb) {
    if (interpretationId === 'new') {
      interpretation.create().then(function(instance) {
        interpretationId = instance.dataValues.id;
        trigger.create({interpretationId: interpretationId, text: text}).then(function(instance) {
          cb(instance);
        });
      });
    } else if (triggerId === 'new') {
      trigger.create({interpretationId: interpretationId, text: text}).then(function(instance) {
        cb(instance);
      });
    } else {
      trigger.update(
        { text: text },
        { where: { id: triggerId } }
      ).then(function() {
        cb();
      });
    }
  }
};