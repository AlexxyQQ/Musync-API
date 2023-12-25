const supertest = require("supertest");
const io = require("../../socket");
const app = require("../../app");

const api = supertest(app);
let token = "";
let folderUrl = "";

describe("Folders Test", () => {
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

  test("should get folders", async () => {
    const response = await api
      .get("/api/music/getAllFolders")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);
    folderUrl = response.body.data[0];
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  test("should get songs from folder", async () => {
    const response = await api
      .post("/api/music/getFolderSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .send({
        folderUrl: folderUrl,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  test("should get map of folders with their songs", async () => {
    const response = await api
      .get("/api/music/getAllFolderWithSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});
