const { Sequelize } = require('sequelize');
/* To connect to DB, you must create a Sequelize instance.
  This is done here by passing the connectiontion params to Sequelize constructor.
*/
const sequelize = new Sequelize('tennis_central', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres'
});



module.exports = {sequelize};