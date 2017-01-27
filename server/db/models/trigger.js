var db = require('../db');
var Sequelize = require('sequelize');

var trigger = db.define('trigger', {
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

trigger.sync();

module.exports = trigger;
