const supertest = require("supertest");
const app = require("../../app");
const User = require("../../models/userModel");
const io = require("../../socket");

const api = supertest(app);

describe("User Registration Tests ", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    io.close();
  });

  test("to register new user with profilePicture", async () => {
    const newUser = {
      username: "alexxy",
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@123",
      profilePic: "https://picsum.photos/200",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.statusCode).toBe(200);
  });

  test("to register new user without profilePicture", async () => {
    await User.deleteMany({});
    const newUser = {
      username: "alexxy",
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@123",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.statusCode).toBe(200);
  });

  test("to register user without data", async () => {
    const newUser = {};

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe(
      "Please provide Username, Email, Password, Confirm Password!"
    );
  });

  test("to register user with existing username", async () => {
    const newUser = {
      username: "alexxy",
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@123",
      profilePic: "https://picsum.photos/200",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe(
      "User with same USERNAME already exists!"
    );
  });

  test("to register user with existing email", async () => {
    const newUser = {
      username: "alexxy2",
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@123",
      profilePic: "https://picsum.photos/200",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe("User with same EMAIL already exists!");
  });

  test("to register user with wrong confirmPassword", async () => {
    const newUser = {
      username: "testuser2",
      email: "test2@test.com",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@1234",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe("Passwords do not match!");
  });

  test("to register user with invalid email", async () => {
    const newUser = {
      username: "testuser3",
      email: "test3@test",
      password: "VerySecretPassword@123",
      confirmPassword: "VerySecretPassword@123",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe(
      "Users validation failed: email: Please enter a valid email address."
    );
  });

  afterAll(async () => {
    io.close();
  });
});
