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

  router.get("/", async (req, res) => {
    // read the cookie in /login
    const { username } = req.signedCookies;
    const users = await PostUsers(username)
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.sendStatus(401);
    }
    const { fullName } = user;
    return res.json({ fullName, username });
  });

  async function PostUsers(username) {
    const query = {
      username: username
    }

    return await mongoDatabase
        .collection("users")
        .find(query)
        .map(({ username}) => ({
          username,
        }))
        .toArray();
  }

  router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const query = {
      username: username,
      password: password
    }

    const login = await GetUsers(query)

    const user = login.find(u => u.username === username);
    if (user && user.password === password) {
      // set a cookie
      res.cookie("username", username, { signed: true });
      res.sendStatus(200);

    } else {
      res.send(401);
    }

  });

  async function GetUsers(query) {
    return await mongoDatabase
        .collection("users")
        .find(query)
        .map(({ username, password }) => ({
          username,
          password,
        }))
        .toArray();
  }

  router.delete("/", (req, res) => {
    res.clearCookie("username");
    res.sendStatus(200);
  });


  return router;
}

