import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

let mongoClient;
beforeAll(async () => {
  mongoClient = new MongoClient(process.env.MONGODB_URL);
  await mongoClient.connect();
});

afterAll(() => {
  mongoClient.close();
});

describe("Login testing", function () {
  it("Login user", async function () {
    request(app)
      .post("/api/login")
      .send({ username: "root", password: "root" })
      .expect(200);
  });

  it("Logout user", async function () {
    request(app)
        .delete("/api/login")
        .send()
        .expect(200);
  });

});
