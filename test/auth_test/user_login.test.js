const supertest = require("supertest");

const io = require("../../socket");

const app = require("../../app");
const User = require("../../models/userModel");

const api = supertest(app);
token = "";

describe("User Login Tests ", () => {
  beforeAll(async () => {
    io.close();
  });

  test("to login user", async () => {
    const registeredUser = {
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
    };

    const response = await api
      .post("/api/users/login")
      .set("apisecret", "Apple")
      .send(registeredUser);

    token = response.body.data["token"];
    expect(response.statusCode).toBe(200);
  });

  test("to login user without api verification", async () => {
    const registeredUser = {
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@123",
    };

    const response = await api.post("/api/users/login").send(registeredUser);

    expect(response.statusCode).toBe(403);
  });

  test("to login user with wrong password", async () => {
    const registeredUser = {
      email: "aayushpandey616@gmail.com",
      password: "VerySecretPassword@1233",
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
      password: "VerySecretPassword@123",
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

  test("to login user with only token", async () => {
    const response = await api.get("/api/users/loginWithToken").set({
      authorization: `Bearer ${token}`,
      apisecret: "Apple",
    });
    expect(response.statusCode).toBe(200);
  });

  test("to login user without token", async () => {
    const response = await api.get("/api/users/loginWithToken").set({
      apisecret: "Apple",
    });
    expect(response.body.message).toBe("Unauthorized");
  });

  // test("to login user with expired token", async () => {
  //   // add 500ms delay to make sure token is expired
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   const response = await api.get("/api/users/loginWithToken").set({
  //     authorization: `Bearer ${token}`,
  //     apisecret: "Apple",
  //   });
  //   expect(response.body.message).toBe("Token Expired");
  // });

  test("to login user with invalid token", async () => {
    const response = await api.get("/api/users/loginWithToken").set({
      authorization: `Bearer akjsdkjAKSJDKkjSJKDjkaSKJHDkjaHKS`,
      apisecret: "Apple",
    });
    expect(response.body.message).toBe("Unauthorized");
  });

  afterAll(async () => {
    io.close();
  });
});
