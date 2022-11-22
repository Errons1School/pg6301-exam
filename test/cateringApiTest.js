import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
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

describe("Catering testing", function () {

    it("Get all catering", async function () {
        request(app)
            .get("/api/catering")
            .expect("Content-Type", /json/)
            .expect(200)
    });

    it("Test post", async function () {
        request(app)
            .post("/api/catering/new")
            .send({
                name: "test",
                price: "111",
                description: "test",
                ingredients: "ingredients"
            })
            .expect(200);
    });

    it("Test post", async function () {
        request(app)
            .delete("/api/catering/delete?name=test")
            .expect(200);
    });

});