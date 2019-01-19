const Sequelize = require('sequelize');
const sequelize = require('./ModelHeader.js');

const UserModel = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  email: Sequelize.STRING,
  pwd: Sequelize.STRING,
  nicheng: Sequelize.STRING,
  updtime: Sequelize.DATE,
  role: Sequelize.TEXT('tiny'),
  createtime: Sequelize.DATE,
  msgnum: Sequelize.INTEGER
}, {
  timestamps: false
});
module.exports = UserModel;
