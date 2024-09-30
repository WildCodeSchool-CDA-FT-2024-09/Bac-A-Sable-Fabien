import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { Langbyrepo } from "./langbyrepo.entity";
import Joi from "joi";

const langbyrepoControllers = Router();

// validation schema
const schema = Joi.object({
    repo_id: Joi.string().required(),
    lang_id: Joi.number().required()
});

// middleware for validation
const validateLangbyrepo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
        res.status(422).json(error);
    } else {
        next();
    }
};

langbyrepoControllers.get("/", async (_, res: Response) => {
    const result = await Langbyrepo.find();

    res.status(200).json(result);
});

langbyrepoControllers.post("/", validateLangbyrepo, (req: Request, res: Response) => {
    const langbyrepo = new Langbyrepo();
    langbyrepo.repo_id = req.body.repo_id;
    langbyrepo.lang_id = parseInt(req.body.lang_id);
    langbyrepo.save();

    res.status(201).json(req.body); // created
});

export default langbyrepoControllers;