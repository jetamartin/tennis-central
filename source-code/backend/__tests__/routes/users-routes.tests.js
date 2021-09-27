process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const {testDbSetup, testDbTeardown, token } = require("../testSetup");

beforeAll(testDbSetup);
afterAll(testDbTeardown)

describe("GET /users", () => {
  test("Get all users", async () => {
    const resp = await request(app).get("/users");
    expect(resp.status).toBe(200);
    expect(resp.body.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: "jDavis",
        }),
      ])
    );
  });
});

describe("GET /users/3", () => {
  test("Test that GET request for user rejected when JWT not provided", async () => {
    const resp = await request(app).get("/users/1");
    expect(resp.status).toBe(401);
  });
});

describe("GET /users/3", () => {
  test("Test that GET you can return a specific user", async () => {
    const resp = await request(app)
      .get("/users/3")
      .set("Authorization", `Bearer ${token}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.type).toBe("application/json");
  });
});

describe("PATCH /users/3", () => {
  test("Test update of user profile information", async () => {
    const resp = await request(app)
      .patch("/users/3")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "jet1@mail.com",
      });
    const response = await request(app)
      .get("/users/3")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.user.email).toEqual("jet1@mail.com");
  });
});

describe("DELETE /users/3", () => {
  test("Test that user can be deleted", async () => {
    debugger;
    let resp = await request(app)
      .delete("/users/3")
      .set("Authorization", `Bearer ${token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body.deleted).toEqual(3);
  });
});
