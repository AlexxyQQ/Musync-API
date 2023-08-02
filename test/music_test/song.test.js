const supertest = require("supertest");
const fs = require("fs"); // Make sure to import fs module
const io = require("../../socket");
const app = require("../../app");

const api = supertest(app);
let token = "";

describe("Get All Song Test", () => {
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

  // Assuming the route handler you provided is for getting all songs
  test("should get all songs", async () => {
    const response = await api
      .get("/api/music/getAllSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Assuming the route handler you provided is for getting all songs
  test("should handle server error during file retrieval", async () => {
    jest.spyOn(fs, "existsSync").mockImplementation(() => {
      throw new Error("Simulated error");
    });

    const response = await api
      .get("/api/music/getAllSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to retrieve file data");

    fs.existsSync.mockRestore(); // Restore the original implementation
  });

  // Assuming the user has not uploaded any songs
  test("should return empty array", async () => {
    token = await regU();

    const response = await api
      .get("/api/music/getAllSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    console.log(response.body.data);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBe(0);
  });

  afterAll(async () => {
    io.close();
    // await User.deleteMany({});
  });
});

async function regU() {
  const newUser = {
    username: "test",
    email: "test@test.com",
    password: "test@123",
    confirmPassword: "test@123",
    profilePic: "https://picsum.photos/200",
  };

  const signupResponse = await api
    .post("/api/users/signup")
    .set("apisecret", "Apple")
    .send(newUser);

  const registeredUser = {
    email: "test@test.com",
    password: "test@123",
  };

  const loginResponse = await api
    .post("/api/users/login")
    .set("apisecret", "Apple")
    .send(registeredUser);

  return loginResponse.body.data["token"];
}

describe("GetAllPublicSongs Tets", () => {
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

  test("should get all public songs", async () => {
    const response = await api
      .get("/api/music/getAllPublicSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("should make song public/private ", async () => {
    const response = await api
      .post("/api/music/tooglePublic")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .send({
        songId: "1000000177",
        toggleValue: false,
      });

    expect(response.statusCode).toBe(200);
  });

  test("should handle non-existent song", async () => {
    const response = await api
      .post("/api/music/tooglePublic")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .send({
        songId: "nonexistent_id", // Provide a non-existent id
        toggleValue: true,
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "An error occurred while making the song public"
    );
  });
});
