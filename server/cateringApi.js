import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export function CateringApi(mongoDatabase) {
  const router = new express.Router();

  router.use(bodyParser.json());
  router.use(cookieParser(process.env.COOKIE_SECRET));
  router.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );

  router.get("/", async (req, res) => {
    const catering = await GetAllCatering();
    return res.json(catering);
  });

  async function GetAllCatering() {
    return await mongoDatabase
      .collection("catering")
      .find()
      .map(({ name, price, description, ingredients }) => ({
        name,
        price,
        description,
        ingredients,
      }))
      .toArray();
  }

  router.post("/new", async (req, res) => {
    const { name, price, description, ingredients } = req.body;
    const catering = {
      name: name,
      price: price,
      description: description,
      ingredients: ingredients,
    };
    await AddNewCatering(catering);
    res.sendStatus(200);
  });

  async function AddNewCatering(catering) {
    return await mongoDatabase.collection("catering").insertOne({
      name: catering.name,
      price: catering.price,
      description: catering.description,
      ingredients: catering.ingredients,
    });
  }

  router.delete("/delete?*", async (req, res) => {
    const { name } = req.query;
    const catering = {
      name: name,
    };

    await DeleteCatering(catering);
    res.sendStatus(200);
  });

  async function DeleteCatering(catering) {
    return await mongoDatabase.collection("catering").deleteOne({
      name: catering.name,
    });
  }

  return router;
}
