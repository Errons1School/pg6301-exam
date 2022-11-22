import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {MongoClient} from "mongodb";
import {CateringApi} from "./cateringApi.js";
import {LoginApi} from "./loginApi.js";

// Allows .env file to be imported
dotenv.config();

//Setup for parsing JSON and Cookies from client
const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.urlencoded({
    extended: false
}))

//Setup for connection to mongoDB
const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
    console.log("Connected to mongodb");
    app.use(
        "/api/catering",
        CateringApi(mongoClient.db(process.env.MONGODB_DATABASE))
    );
});

//Check if user is logged inn with secure cookie
app.use(async (req, res, next) => {
    const { username } = req.signedCookies;
    const mongoDatabase = mongoClient.db(process.env.MONGODB_DATABASE);
    const cookieLogin = await mongoDatabase
        .collection("users")
        .find({
            username: [username]
        })
        .limit(1)
        .toArray();

    req.user = cookieLogin[0];
    next();
})


app.use("/api/login", LoginApi(mongoClient.db(process.env.MONGODB_DATABASE)));


//Import of generated HTML-file
app.use(express.static("../client/dist/"));

//Filter for requests
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

//Starting up server
const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Started on http://localhost:${server.address().port}`);
});