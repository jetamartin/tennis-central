process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");

const { testDbSetup, testDbTeardown } = require("../testSetup");

beforeAll(testDbSetup);
afterAll(testDbTeardown);

describe("POST /auth/login", () => {
  test("Test successful login", async () => {
    const resp = await request(app).post("/auth/login").send({
      username: "jMartin",
      password: "1234",
    });
    expect(resp.status).toBe(200);
    expect(resp.body.userinfo.firstName).toEqual("Jet");
  });
});

describe("POST /auth/register", () => {
  test("Test successful user reg", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "fSmith",
      password: "1234",
      email: "fSmith@mail.com",
      firstName: "Fred",
    });
    expect(resp.status).toBe(201);
    expect(resp.body.userinfo.firstName).toBe("Fred");
  });
});
