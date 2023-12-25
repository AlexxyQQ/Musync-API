const supertest = require("supertest");
const io = require("../../socket");
const app = require("../../app");
const api = supertest(app); // Use supertest directly on the app instance

describe("Artist Test", () => {
  let token; // Declare token variable

  beforeAll(async () => {
    io.close();
    const registeredUser = {
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
    };

    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send(registeredUser);

    token = response.body.data["token"];
  });

  test("should get map of Artist with songs", async () => {
    const response = await api
      .get("/api/music/getAllArtistWithSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});
