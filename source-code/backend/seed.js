const { User, Message, Partner } = require("./models");

async function seedData() {
  // create a user
  const testUser = await User.create({
    username: "test",
    password: "1234",
    email: "test@gmail.com",
    city: "San Diego",
    firstName: "Test",
    gender: "Male",
    lastName: "User",
    match_availability: {},
    max_travel_distance: 12,
    ntrp_rating: "1.0",
    opponent_gender: "Male only",
    oppponent_ntrp_rating_range: {},
    postalCode: 90210,
    street_address: "1 Fake Street",
  });

  // create a second user
  const testUser2 = await User.create({
    username: "test2",
    password: "1234",
    email: "test2@gmail.com",
    city: "San Diego",
    firstName: "Test",
    gender: "Male",
    lastName: "User",
    match_availability: {},
    max_travel_distance: 12,
    ntrp_rating: "1.0",
    opponent_gender: "Male only",
    oppponent_ntrp_rating_range: {},
    postalCode: 90210,
    streetAddress: "2 Fake Street",
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
  const partner1 = await Partner.create({
    // partner_id: 1,
    contact: { email: "test@gmail.com", telNum: "858-366-2045" },
  });
  const partner2 = await Partner.create({
    // partner_id: 2,
    contact: { email: "test2@gmail.com", telNum: "858-367=2046" },
  });


  // associate the message to each user
  testUser.addSentMessage(testMessage);
  testUser2.addReceivedMessage(testMessage);

  // associate partner
  testUser.addPlayer(partner1);  
  testUser2.addPartner(partner1);

  testUser2.addPlayer(partner2);
  testUser.addPartner(partner2);

  // partner1.addPlayer(testUser.id)
  // partner1.addPartner(testUser2.id)
  // partner2.addPlayer(testUser2.id)
  // partner2.addPartner(testUser.id)
}

module.exports = {
  seedData,
};
