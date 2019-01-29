const Sequelize = require('sequelize');
const sequelize = require('./ModelHeader.js');

const SayImgModel = sequelize.define('sayimgs', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  uid: Sequelize.BIGINT,
  sayid: Sequelize.BIGINT,
  imgpath: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = SayImgModel;
