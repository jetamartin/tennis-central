// const { DATEONLY } = require("sequelize/types");
const { User, Message, Partner } = require("./models");

async function seedData() {
  // create a user
  const testUser = await User.create({
    username: "jDavis",
    password: "1234",
    email: "jDavis@gmail.com",
    city: "San Diego",
    firstName: "Jason",
    lastName: "Davis",
    gender: "Male",
    birthday: new Date(1975, 9, 17), 
    match_availability: {
      Mon: ["eAM", "PM", "EVE"],
      Tue: ["PM", "EVE"],
      Sat: ["AM", "PM", "EVE"],
      Sun: ["AM", "PM"],
    },
    session_type: "Either Match or Rallying",
    match_type: ["Singles", "Doubles", "Mixed"],
    max_travel_distance: 10,
    my_ntrp_rating: 4.5,
    opponent_gender: "Male only",
    opponent_ntrp_rating_range: { low: 4.0, high: 5.0 },
    postalCode: 90210,
    street_address: "1 Fake Street",
  });

  // create a second user
  const testUser2 = await User.create({
    username: "rBronson",
    password: "1234",
    email: "rBronson@gmail.com",
    city: "San Diego",
    firstName: "Rich",
    lastName: "Bronson",
    gender: "Male",
    birthday: new Date(1978, 2, 29), 
    match_availability: {
      Sat: ["AM", "PM", "EVE"],
      Sun: ["AM", "PM"],
    },
    session_type: "Either Match or Rallying",
    match_type: ["Singles", "Doubles"],
    max_travel_distance: 10,
    my_ntrp_rating: 4.5,
    opponent_gender: "Male only",
    opponent_ntrp_rating_range: { low: 4.0, high: 5.0 },
    postalCode: 90210,
    streetAddress: "2 Fake Street",
  });

  // create a third user
  const testUser3 = await User.create({
    username: "jMartin",
    password: "1234",
    email: "jMartin@gmail.com",
    city: "San Diego",
    firstName: "Jet",
    lastName: "Martin",
    gender: "Male",
    birthday: new Date(1967, 9, 11), 

    match_availability: {
      Sat: ["AM", "PM", "EVE"],
      Sun: ["AM", "PM"],
    },
    session_type: "Matches/Sets only",
    match_type: ["Singles"],
    max_travel_distance: 10,
    my_ntrp_rating: 4.5,
    opponent_gender: "Male only",
    opponent_ntrp_rating_range: { low: 4.0, high: 5.0 },
    postalCode: 92126,
    streetAddress: "10773 Glendover Lane",
  });
  // create a message
  const testMessage = await Message.create({
    content:
      "Esse adipisicing excepteur sunt aute irure consectetur est ea laboris incididunt.",
    read: false,
    sentDate: new Date(),
    subject: "Test",
  });

  // create partners
  // const partner1 = await Partner.create({
  //   // partner_id: 1,
  //   contact: { email: "test@gmail.com", telNum: "858-366-2045" },
  // });
  // const partner2 = await Partner.create({
  //   // partner_id: 2,
  //   contact: { email: "test2@gmail.com", telNum: "858-367=2046" },
  // });

  // associate the message to each user
  // testUser.addSentMessage(testMessage);
  // testUser2.addReceivedMessage(testMessage);

  // associate partner
  // testUser.addPlayer(partner1);
  // testUser2.addPartner(partner1);

  // testUser2.addPlayer(partner2);
  // testUser.addPartner(partner2);
}

module.exports = {
  seedData,
};
