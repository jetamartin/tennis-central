const { Sequelize } = require("sequelize");
/* To connect to DB, you must create a Sequelize instance.
  This is done here by passing the connectiontion params to Sequelize constructor.
*/

let sequelize;
if (process.env.DATABASE_URL) {
  // use Heroku's Database URL
  sequelize = new Sequelize(process.env.DATABASE_URL);

  // Added 'if else' statement to account for test environment
} else if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize("tennis_central_test", "postgres", "", {
    host: "localhost",
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize("tennis_central", "postgres", "", {
    host: "localhost",
    dialect: "postgres",
  });
}

module.exports = { sequelize };
