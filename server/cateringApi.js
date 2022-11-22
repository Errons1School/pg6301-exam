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
    })

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

    router.post("/new", (req, res) => {

    })

    router.delete("/delete", (req, res) => {

    })

    return router;
}