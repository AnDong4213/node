const Sequelize = require('sequelize');
const sequelize = require('./ModelHeader.js');

const PetinfoModel = sequelize.define('petinfos', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  uid: Sequelize.BIGINT,
  nicheng: Sequelize.STRING,
  pettype: Sequelize.INTEGER,
  petsort: Sequelize.STRING,
  sex: Sequelize.TEXT('tiny'),
  age: Sequelize.INTEGER,
  introduce: Sequelize.STRING,
  petimg: Sequelize.STRING,
  updtime: Sequelize.DATE,
  createtime: Sequelize.DATE
}, {
  timestamps: false
});

module.exports = PetinfoModel;
