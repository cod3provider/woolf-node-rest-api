import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";
import { findExistUser } from "../services/authServices.js";

const { DB_TEST_URL } = process.env;

const userData = {
  email: "12@mail.com",
  password: "12345678",
};
const invalidEmail = "invalidemailmail.com";
const invalidPassword = "11111111";
const invalidPasswordLessMinLength = "11111";
const wrongEmail = "wrong@mail.com";

describe("test /users/login", () => {
  let server = null;

  beforeAll(async () => {
    try {
      await mongoose.connect(DB_TEST_URL);
      server = app.listen(3000);
    } catch (err) {
      console.error(
        "Не удалось подключиться к базе данных или запустить сервер:",
        err,
      );
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    if (server) {
      server.close();
    }
  });

  test("test login with correct data", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send(userData);
    console.log("body", body);
    console.log("userData", userData);

    expect(statusCode).toBe(200);
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(userData.email);
    expect(body.user.subscription).toBeDefined();
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");

    const user = await findExistUser({ email: userData.email });
    expect(user).not.toBeNull();
    expect(user.email).toBe(userData.email);
    expect(user.subscription).toBe(body.user.subscription);
  });

  test("test login without email", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ password: userData.password });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  test("test login without password", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: userData.email });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"password" is required');
  });

  test("test login without body", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      "Body is empty, but it must have at least one field",
    );
  });

  test("test login with invalid email", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: invalidEmail, password: userData.password });

    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      '"email" with value "invalidemailmail.com" fails to match the required pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
    );
  });

  test("test login with invalid password", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: userData.email, password: invalidPassword });

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password invalid");
  });

  test("test login with wrong email", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: wrongEmail, password: userData.password });

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  test("test password length less 8 chars", async () => {
    const { statusCode, body } = await request(app)
      .post("/users/login")
      .send({ email: userData.email, password: invalidPasswordLessMinLength });

    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      '"password" length must be at least 8 characters long',
    );
  });
});
