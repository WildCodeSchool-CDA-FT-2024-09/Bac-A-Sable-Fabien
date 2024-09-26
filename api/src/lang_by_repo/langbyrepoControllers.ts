import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import langbyrepo from "../../data/lang_by_repo.json";
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

langbyrepoControllers.get("/", (_, res: Response) => {
    res.status(200).json(langbyrepo);
});

langbyrepoControllers.post("/", validateLangbyrepo, (req: Request, res: Response) => {
    langbyrepo.push(req.body);
    res.status(201).json(req.body);
});

export default langbyrepoControllers;