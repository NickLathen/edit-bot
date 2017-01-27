var db = require('../db');
var Sequelize = require('sequelize');

var response = db.define('response', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING
  },
  interpretationId: {
    type: Sequelize.INTEGER,
  },
});

response.sync({force: true});

module.exports = response;
