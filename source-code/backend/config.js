"use strict";
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
debugger;
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" || process.env.NODE_ENV ? 1 : 12;

let DB_URI;
// Added -- How to connect test db and seed data
if (process.env.NODE_ENV === "test") {
  DB_URI = "tennis_central_test";
} else if (process.env.NODE_ENV === "dev") {
  DB_URI = "tennis_central"; 
} else {
    DB_URI = process.env.DATABASE_URL || "tennis_central";
}


module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  PORT,
  DB_URI,
};
