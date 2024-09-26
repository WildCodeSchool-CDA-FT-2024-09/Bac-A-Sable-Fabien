import express from "express";
import { Response } from "express";
import reposControllers from "./repos/reposControllers";
import langsControllers from "./langs/langsControllers";
import statusControllers from "./status/statusControllers";
import langbyrepoControllers from "./lang_by_repo/langbyrepoControllers";

const router = express.Router();

router.get("/", (_, res: Response) => {
    res.status(200).send('Hello my friend');
});

router.use("/repos", reposControllers);
router.use("/langs", langsControllers);
router.use("/status", statusControllers);
router.use("/langbyrepo", langbyrepoControllers);

export default router;