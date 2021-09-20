const { sequelize } = require('../db');
const { seedData } = require('../seed');
const { createToken } = require('../helpers/tokens');

const commonBeforeAll = async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await seedData();
};

const commonAfterAll = async () => {
    await sequelize.sync({ force: true });
};

const token = createToken({id: 3, isAdmin: false});

module.exports = {
    commonBeforeAll,
    commonAfterAll,
    token,
};