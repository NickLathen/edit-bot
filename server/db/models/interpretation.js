var db = require('../db');
var Sequelize = require('sequelize');

var interpretation = db.define('interpretation', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

interpretation.sync();

module.exports = interpretation;
