import { Request, Response } from "express";
import { Router } from "express";
import { Langbyrepo } from "./langbyrepo.entity";
import { validate } from "class-validator";

const langbyrepoControllers = Router();

langbyrepoControllers.get("/", async (_, res: Response) => {
    try {
        const result = await Langbyrepo.find();
        res.status(200).json(result);
    } catch (error) {
        res.sendStatus(500);
    }
});

langbyrepoControllers.post("/", async (req: Request, res: Response) => {
    try {
        const langbyrepo = new Langbyrepo();
        langbyrepo.repo_id = req.body.repo_id;
        langbyrepo.lang_id = parseInt(req.body.lang_id);

        const error = await validate(langbyrepo);
        if (error.length > 0) {
            res.status(422).json(error);
        } else {
            await langbyrepo.save();
            res.status(201).json(langbyrepo); // created
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

export default langbyrepoControllers;