const supertest = require("supertest");
const io = require("../../socket");
const app = require("../../app");
const api = supertest(app); // Use supertest directly on the app instance

describe("Album Test", () => {
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

  test("should get Albums", async () => {
    const response = await api
      .get("/api/music/getAllAlbums")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  test("should get map of albums with their songs", async () => {
    const response = await api
      .get("/api/music/getAllAlbumWithSongs")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token);

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});

describe("Album Test", () => {
  let token;

  beforeAll(async () => {
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

  test("should upload album art successfully", async () => {
    const response = await api
      .post("/api/music/uploadAlbumArt")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .field("mainFolder", "myMainFolder")
      .field("subFolder", "subfolder1/subfolder2")
      .field("songId", "123")
      .attach(
        "albumArtUP",
        "D:/Softwarica/Sem-5/Web API Development/Final/MusyncAPI/test/google.png"
      );

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe("File uploaded successfully");
  });

  test("should handle missing file", async () => {
    const response = await api
      .post("/api/music/uploadAlbumArt")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .field("mainFolder", "myMainFolder")
      .field("subFolder", "subfolder1/subfolder2")
      .field("songId", "123");

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please choose a file");
  });

  test("should handle missing main folder", async () => {
    const response = await api
      .post("/api/music/uploadAlbumArt")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .field("subFolder", "subfolder1/subfolder2")
      .field("songId", "123")
      .attach(
        "albumArtUP",
        "D:/Softwarica/Sem-5/Web API Development/Final/MusyncAPI/test/google.png"
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please choose the main folder");
  });

  test("should handle missing sub folder", async () => {
    const response = await api
      .post("/api/music/uploadAlbumArt")
      .set("apisecret", "Apple")
      .set("Authorization", "Bearer " + token)
      .field("mainFolder", "myMainFolder")
      .field("songId", "123")
      .attach(
        "albumArtUP",
        "D:/Softwarica/Sem-5/Web API Development/Final/MusyncAPI/test/google.png"
      );

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please choose the sub folder");
  });

  // Add more test cases to cover other branches...
});
