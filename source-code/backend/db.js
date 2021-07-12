const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tennis_central', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});



module.exports = {sequelize};