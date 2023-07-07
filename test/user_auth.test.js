const supertest = require("supertest");

const app = require("../app");

const User = require("../models/userModel");
const user = require("../models/userModel");

const api = supertest(app);

describe("User Registration Tests ", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test("to register new user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@test.com",
      password: "TestUser@123",
      confirmPassword: "TestUser@123",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.statusCode).toBe(200);
  });

  test("to register user with wrong confirmPassword", async () => {
    const newUser = {
      username: "testuser2",
      email: "test2@test.com",
      password: "TestUser@123",
      confirmPassword: "TestUser@1234",
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
      password: "TestUser@123",
      confirmPassword: "TestUser@123",
    };

    const response = await api
      .post("/api/users/signup")
      .set("apisecret", "Apple")
      .send(newUser);

    expect(response.body.message).toBe(
      "Users validation failed: email: Please enter a valid email address."
    );
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
});

describe("User Login Tests ", () => {
  test("to login user", async () => {
    const registeredUser = {
      email: "test@test.com",
      password: "TestUser@123",
    };

    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send(registeredUser);

    expect(response.statusCode).toBe(200);
  });

  test("to login user with wrong password", async () => {
    const registeredUser = {
      email: "test@test.com",
      password: "TestUser@1234",
    };

    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send(registeredUser);

    expect(response.body.message).toBe("Incorrect Password.");
  });

  test("to login user with wrong email", async () => {
    const registeredUser = {
      email: "test21@test.com",
      password: "TestUser@1234",
    };

    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send(registeredUser);

    expect(response.body.message).toBe("User with this email does not exist!");
  });

  test("to login user without data", async () => {
    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send();

    expect(response.body.message).toBe("Please provide email!");
  });
});
