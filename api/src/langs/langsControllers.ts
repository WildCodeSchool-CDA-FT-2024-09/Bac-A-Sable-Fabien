import { Request, Response, NextFunction } from "express";
import { Router } from "express";
// import { LangType } from "./langs.types";
import Joi from "joi";
import { Lang } from "./lang.entity";

const langsControllers = Router();

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

langsControllers.get("/", async (_: any, res: Response) => {
    const langs = await Lang.find();
    console.log(langs);

    res.status(200).send(langs);
});

langsControllers.post("/", validateLang, (req: Request, res: Response) => {
    const lang = new Lang();
    lang.label = req.body.label;
    lang.save();

    res.status(201).json(req.body); // created
});

langsControllers.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const lang = await Lang.findOneBy({ id });

    if (lang === null) {
        res.sendStatus(204); // no content
    } else {
        res.status(200).json(lang);
    }
});

langsControllers.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const lang = await Lang.findOneBy({ id });
    if (lang !== null) {
        lang.remove();
    }
    res.sendStatus(204); // no content
});

langsControllers.put("/:id", validateLang, async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const lang = await Lang.findOneBy({ id });
    if (lang !== null) {
        lang.label = req.body.label;
        lang.save();
    }

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default langsControllers;