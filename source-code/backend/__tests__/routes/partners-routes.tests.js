process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");

let token;
beforeAll((done) => {
  request(app)
    .post("/auth/login")
    .send({
      username: "jMartin",
      password: "1234",
    })
    .end((err, response) => {
      token = response.body.userinfo.token;
      done();
    });
});

describe("POST /users/3/partners/1", () => {
  test("Add a partner", async () => {
    const resp = await request(app)
      .post("/users/3/partners/1")
      .set("Authorization", `Bearer ${token}`);
    expect(resp.status).toBe(201);
    expect(resp.body.partner.partnerId).toEqual(1);
  });
});

describe("GET /users/3/partners", () => {
  test("Get a users partners", async () => {
    const resp = await request(app)
      .get("/users/3/partners")
      .set("Authorization", `Bearer ${token}`);
    expect(resp.status).toBe(200);
    expect(resp.body[0].partner.id).toEqual(1);
  });
});

describe("DELETE /users/3/partners/1", () => {
  test("Get a users partners", async () => {
    debugger;
    const resp = await request(app)
      .delete("/users/3/partners/1")
      .set("Authorization", `Bearer ${token}`);
    expect(resp.status).toBe(200);
    expect(resp.body.deleted).toEqual(1);
  });
});

