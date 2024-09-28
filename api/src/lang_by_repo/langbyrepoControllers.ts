import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { LangbyrepoType } from "./langbyrepo.types";
import { AppDataSource } from "../data-source";
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
    const result: LangbyrepoType[] = await AppDataSource
        .getRepository(Langbyrepo)
        .createQueryBuilder("lang_by_repo")
        .getMany();

    res.status(200).json(result);
});

langbyrepoControllers.post("/", validateLangbyrepo, async (req: Request, res: Response) => {
    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into("lang_by_repo")
        .values([
            {
                repo_id: req.body.repo_id,
                lang_id: req.body.lang_id
            }
        ])
        .execute();

    res.status(201).json(req.body); // created
});

export default langbyrepoControllers;