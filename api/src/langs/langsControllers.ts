import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import langs from "../../data/langs.json";
import { Lang } from "./langs.types";
import Joi from "joi";

const langsControllers = Router();

let myLangs: Lang[] = langs;

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

langsControllers.get("/", (_, res: Response) => {
    res.status(200).send(myLangs);
});

langsControllers.post("/", validateLang, (req: Request, res: Response) => {
    myLangs.push(req.body);
    res.status(201).json(req.body);
});

langsControllers.get("/:id", (req: Request, res: Response) => {
    const lang = myLangs.find(lang => lang.id === parseInt(req.params.id)) as Lang;
    res.status(200).json(lang);
});

langsControllers.delete("/:id", (req: Request, res: Response) => {
    myLangs = myLangs.filter(lang => lang.id !== parseInt(req.params.id));
    res.sendStatus(204);
});

langsControllers.put("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const { label } = req.body;

    myLangs = myLangs.map(lang => {
        if (lang.id === parseInt(id)) {
            return { ...lang, label: label };
        } else {
            return lang;
        }
    });

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default langsControllers;