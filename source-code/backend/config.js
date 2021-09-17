"use strict";

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};