const request = require("supertest");
const app = require("../server");

describe("GET /api/hotels", () => {
  it("responds with json containing a list of all hotels", async () => {
    const response = await request(app).get("/api/hotels");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("hotels");
    expect(response.body.hotels).toBeInstanceOf(Array);
  });
});