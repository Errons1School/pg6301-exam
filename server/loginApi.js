import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export function LoginApi(mongoDatabase) {
  const router = new express.Router();

  router.use(bodyParser.json());
  router.use(cookieParser(process.env.COOKIE_SECRET));
  router.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  router.get("/", (req, res) => {
    console.log("Inside");
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { fullName, username } = req.user;
    res.json({ username, fullName });
  });

  router.post("/", async (req, res) => {

    // set a cookie
    // read the cookie in /login

    const { username, password } = req.body;

    const query = {
      username: "root",
      password: "root"
    }

    const login = await mongoDatabase
      .collection("users")
      .find(query)
      .map(({ username, password }) => ({
        username,
        password,
      }))
      .toArray();


    if (login[0].username === username && login[0].password === password) {
      res.cookie("username", username, { signed: true });
      res.sendStatus(200);
    } else {
      res.send(401);
    }

  });

  return router;
}

