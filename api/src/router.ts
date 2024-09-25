import express from "express";
import { Response } from "express";
import reposControllers from "./repos/reposControllers";
import langsControllers from "./langs/langsControllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
    res.status(200).send('Hello my friend');
});

router.use("/repos", reposControllers);
router.use("/langs", langsControllers);

export default router;