const Sequelize = require('sequelize');

const sequelize = new Sequelize('pet', 'zad', '123456', {
  host: '127.0.0.1',
  dialect: 'mysql'
});
module.exports = sequelize;
