const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");

// Model Definition
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING(10),
      unique: true,
      // allowNull: false,
    },
    password: {
      type: DataTypes.STRING(25),
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      // allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    // Address information below (street_address, city, postal_code) could be separate table
    street_address: {
      type: DataTypes.STRING(30),
    },
    city: {
      type: DataTypes.STRING(30),
    },
    postal_code: {
      type: DataTypes.STRING(10),
      // allowNull: false,
    },
    gender: {
      // Male or Female
      type: DataTypes.ENUM("Male", "Female"),
      // allowNull: false
    },
    ntrp_rating: {
      // (1.0 -> 7.0 by increments of .5)
      type: DataTypes.ENUM(
        "1.0",
        "1.5",
        "2.0",
        "2.5",
        "3.0",
        "3.5",
        "4.0",
        "4.5",
        "5.0",
        "5.5",
        "6.0",
        "6.5",
        "7.0"
      ),
      // allowNull: false
    },
    opponent_gender: {
      // Male, Female, Either
      type: DataTypes.ENUM("Male only", "Female only", "Either gender"),
      // allowNull: false
    },
    oppponent_ntrp_rating_range: {
      // {ntrp_range: {low: '4.5', high: '5.5' }
      type: DataTypes.JSONB,
      // allowNull: false
    },
    max_travel_distance: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    match_availability: {
      // {"day": "Monday",   "availability": ['Early Morning', 'Evening'],
      //  "day": "Saturday", "availability": ['Morning','Afternoon'],
      //  "day": "Sunday",   "availability": ['Afternoon']
      // }
      type: DataTypes.JSONB,
    },
  },
  {
    // Other model options go here.
  }
);

module.exports = { User };
