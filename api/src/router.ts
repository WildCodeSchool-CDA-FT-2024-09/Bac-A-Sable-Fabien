import express from "express";
import { Response } from "express";
import reposControllers from "./repos/reposControllers";
import langsControllers from "./langs/langsControllers";
import statusControllers from "./status/statusControllers";
import commentsControllers from "./comments/commentsControllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
    res.status(200).send('You have nothing to do here.');
});

router.use("/repos", reposControllers);
router.use("/langs", langsControllers);
router.use("/status", statusControllers);
router.use("/comments", commentsControllers);

export default router;