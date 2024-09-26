import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import langs from "../../data/langs.json";
import { Lang } from "./langs.types";
import Joi from "joi";

const langsController = Router();

// validation schema
const schema = Joi.object({
    id: Joi.number().required(),
    label: Joi.string().required(),
});

// middleware for validation
const validateLang = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
        res.status(422).json(error);
    } else {
        next();
    }
};

langsController.get("/", (_, res: Response) => {
    res.status(200).send(langs);
});

langsController.post("/", validateLang, (req: Request, res: Response) => {
    langs.push(req.body);
    res.status(201).json(req.body);
});

langsController.get("/:id", (req: Request, res: Response) => {
    const lang = langs.find(lang => lang.id === parseInt(req.params.id)) as Lang;
    res.status(200).send(lang);
});

export default langsController;