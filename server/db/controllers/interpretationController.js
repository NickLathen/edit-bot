const interpretation = require('../models/interpretation.js');
const response = require('../models/response.js');
const trigger = require('../models/trigger.js');

module.exports = {
  getAll: function getAll(cb) {
    interpretation.findAll({}).then(function(data) {
      cb(data);
    });
  },
  deleteInterpretation: function deleteInterpretation(interpretationId, cb) {
    response.destroy({
      where: {
        interpretationId: interpretationId
      }
    }).then(function() {
      trigger.destroy({
        where: {
          interpretationId: interpretationId
        }
      }).then(function() {
        interpretation.destroy({
          where: {
            id: interpretationId
          }
        }).then(function() {
          cb();
        });
      });
    });
  }
};