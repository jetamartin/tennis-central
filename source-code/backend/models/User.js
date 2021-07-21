const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");

// Model Definition
const User = sequelize.define(
  "User",
  { // Model attributes are defined here
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      // allowNull: false, 
      // validate: {
      //   notEmpty: true,        
      //   len: [2, 15],
      // },
    },
    password: {
      type: DataTypes.STRING(25),
      // allowNull: false,
      // validate: {
      //   notEmpty: true,
      //   len: [3, 25]
      // }, 
    },
    email: {
      type: DataTypes.STRING(30),
      // allowNull: false,
      // validate: {
      //   notEmpty: true, 
      //   isEmail: {
      //     msg: "Invalid email format. Email must be of format 'test@mail.com'"
      //   },
      // },
      
    }, 
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   is: ["^[a-z]+$",'i'],
      // },
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
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
      type: DataTypes.ENUM ("Male", "Female"),
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'Gender must be Male or Female'
      //   }
      // }
    },
    ntrp_rating: {
      // (1.0 -> 7.0 by increments of .5)
      type: DataTypes.ENUM ("1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0"),
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'NTRP rating must be present and have a value between 1.0 and 7.0 in increments of .5'
      //   },
      // }
    },
    opponent_gender: {
      // Male, Female, Either
      type: DataTypes.ENUM("Male only", "Female only", "Either gender"),
      // allowNull: false
    },
    oppponent_ntrp_rating_range: {
      // {ntrp_range: {low: "4.5", high: "5.5" }
      type: DataTypes.JSONB,
      // allowNull: false
    },
    max_travel_distance: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    match_availability: {
      // {"day": "Monday",   "availability": ["Early Morning", "Evening"],
      //  "day": "Saturday", "availability": ["Morning","Afternoon"],
      //  "day": "Sunday",   "availability": ["Afternoon"]
      // }
      type: DataTypes.JSONB,
    }
  },
  {
    // Other model options go here.
  }
  



);


module.exports = { User };
