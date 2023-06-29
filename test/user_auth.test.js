const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");

const User = require("../models/userModel");

const api = supertest(app);

describe("User Auth", () => {
  // beforeAll(async () => {
  //   await User.deleteMany({});
  // });

  test("Register User", async () => {
    const newUser = {
      username: "testuser",
      email: "test@test.com",
      password: "TestUser@123",
      confirmPassword: "TestUser@123",
    };

    const response = await api.post("/api/users/signup").send(newUser);

    expect(response).toBe(201);
  });
});
