import { Request, Response } from "express";
import { Router } from "express";
import langs from "../../data/langs.json";
import { Lang } from "./langs.types";

const langsController = Router();

langsController.get("/", (_, res: Response) => {
    res.status(200).send(langs);
});

langsController.get("/:id", (req: Request, res: Response) => {
    const lang = langs.find(lang => lang.id === parseInt(req.params.id)) as Lang;
    res.status(200).send(lang);
});

export default langsController;