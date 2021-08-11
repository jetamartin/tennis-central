const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");
const ExpressError = require("../ExpressError");

// Model Definition
const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING(15),
      // unique: true,
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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    // Address information below (street_address, city, postal_code) could be separate table
    streetAddress: {
      type: DataTypes.STRING(30),
    },
    city: {
      type: DataTypes.STRING(30),
    },
    postalCode: {
      type: DataTypes.STRING(10),
      // allowNull: false,
    },
    telNum: {
      type: DataTypes.STRING(20),
    },
    birthday: {
      // {month: 12, day: 10, year: 1970}
      type: DataTypes.DATEONLY,
      // get: function() {
      //      return moment(this.getDataValue('birthday')).format('MM.DD.YYYY')
      //   }
    },
    gender: {
      // Male or Female
      type: DataTypes.ENUM("Male", "Female"),
      // allowNull: false,
      // validate: {
      //   notNull: {
      //     msg: 'Gender must be Male or Female'
      //   }
      // }
    },
    my_ntrp_rating: {
      // (1.0 -> 7.0 by increments of .5)
      type: DataTypes.ENUM(
        "1",
        "1.5",
        "2",
        "2.5",
        "3",
        "3.5",
        "4",
        "4.5",
        "5",
        "5.5",
        "6",
        "6.5",
        "7"
      ),
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
    match_type: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    opponent_ntrp_rating_range: {
      // {ntrp_range: {low: "4.5", high: "5.5" }
      type: DataTypes.JSONB,
      defaultValue: {},
      // allowNull: false
    },
    max_travel_distance: {
      type: DataTypes.STRING(5),
      // allowNull: false,
    },
    match_availability: {
      // {"mon": ["EAM", "EVE"],
      //  "sat": ["AM","PM"],
      //  "sun": ["EVE"]
      // }
      type: DataTypes.JSONB,
      defaultValue: {},
    },
    session_type: {
      type: DataTypes.ENUM(
        "Matches/Sets only",
        "Rallying/drills only",
        "Either Match or Rallying"
      ),
    },
  },
  {
    // Other model options go here.
  }
);

User.authenticate = async function (username, password) {
  const user = await User.findOne({
    where: { username: username },
  });
  if (user) {
    if (user.password === password) {
      delete user.password;
      return user;
    }
  }

  throw new ExpressError(404, "Invalid Username/Password");
};

// Class Method
User.register = async function (userRegInfo) {
  console.log("User.register function");
  // Check to see if duplicate username exist
  // if duplicate send 'Duplicate user message' return
  // Create a JWT
  // Create a user
  // return userId and JWT
  const duplicateUser = await User.findOne({
    where: { username: userRegInfo.username },
  });
  if (duplicateUser) {
    throw new ExpressError(
      400,
      "Registration failed. User name already taken please select another one and re-submit"
    );
  }
  const user = await User.create(userRegInfo);
  return user;
};

module.exports = { User };
