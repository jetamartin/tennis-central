"use strict";
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

let DB_URI;
// Added -- How to connect test db and seed data
if (process.env.NODE_ENV === "test") {
  DB_URI = "tennis_central_test";
} else {
  DB_URI = process.env.DATABASE_URL || "tennis_central";
}
// Not sure how the below fits in but got it from an article on creating a test database. see link  
// https://levelup.gitconnected.com/building-an-express-api-with-sequelize-cli-and-unit-testing-882c6875ed59
// {
//   "development": {
//     "database": "wishlist_api_development",
//     "dialect": "postgres"
//   },
//   "test": {
//     "database": "wishlist_api_test",
//     "dialect": "postgres"
//   },
//   "production": {
//     "use_env_variable": "DATABASE_URL",
//     "dialect": "postgres",
//     "dialectOptions": {
//       "ssl": {
//         "rejectUnauthorized": false
//       }
//     }
//   }
// }

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  PORT,
  DB_URI,
};
