import express from "express";
import { Response } from "express";
import repoController from "./repo/repo.controller";
import langController from "./lang/lang.controller";
import statusController from "./status/status.controller";
import commentController from "./comment/comment.controller";

const router = express.Router();

router.get("/", (_, res: Response) => {
    res.status(200).send('You have nothing to do here.');
});

router.use("/repos", repoController);
router.use("/langs", langController);
router.use("/status", statusController);
router.use("/comments", commentController);

export default router;