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

  // getArt: function getArt(id, cb) {
  //   Art.findById(id)
  //   .then(function(art) {
  //     if (art) {
  //       cb(art.dataValues);
  //     } else {
  //       cb(null);
  //     }
  //   })
  //   .catch(function(e) {
  //     console.error(e);
  //   });
  // },

  // insertArt: function insertArt(art) {
  //   for (var key in art) {
  //     if (art[key].length > 255) {
  //       art[key] = art[key].slice(0, 253);
  //     }
  //   }
  //   art.related.forEach(function(id) {
  //     ArtJoin.create({id1: art.id, id2: id});
  //   });
  //   art.related = art.related.join(',');
  //   Art.create(art)
  //   .catch(function(e) {
  //     console.error(e);
  //   });
  // },
};