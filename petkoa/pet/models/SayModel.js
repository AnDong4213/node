const Sequelize = require('sequelize');
const sequelize = require('./ModelHeader.js');

const SayModel = sequelize.define('saysays', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  uid: Sequelize.BIGINT,
  content: Sequelize.STRING,
  updtime: Sequelize.DATE,
  createtime: Sequelize.DATE
}, {
  timestamps: false
});
module.exports = SayModel;
