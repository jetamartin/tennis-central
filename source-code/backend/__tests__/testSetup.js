const { sequelize } = require("../db");
const { seedData } = require("../seed");
const { createToken } = require("../helpers/tokens");

const testDbSetup = async () => {
  await sequelize.authenticate();
    // Synchronizes all Models with the DB by dropping DB table and
    // re-creating it to match model attributes    //
    console.log("Database has been seeded successfully");
  await sequelize.sync({ force: true });
  await seedData();
};

const testDbTeardown = async () => {
  await sequelize.sync({ force: true });
};

const token = createToken({ id: 3, isAdmin: false });

module.exports = {
  testDbSetup,
  testDbTeardown,
  token,
};
