const { sequelize } = require("./db");
const { seedData } = require("./seed");
const { User, Partner, Message } = require("./models");

async function setUpConsole() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  await seedData();
}

setUpConsole();
