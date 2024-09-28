import { Request, Response, NextFunction } from "express";
import { Router } from "express";
// import langs from "../../data/langs.json";
import { LangType } from "./langs.types";
import Joi from "joi";
import { AppDataSource } from "../data-source";
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
    const myLangs: LangType[] = await AppDataSource
        .getRepository(Lang)
        .createQueryBuilder("lang")
        .getMany();

    res.status(200).send(myLangs);
});

langsControllers.post("/", validateLang, (req: Request, res: Response) => {
    AppDataSource
        .createQueryBuilder()
        .insert()
        .into("Lang")
        .values([
            { label: req.body.label }
        ])
        .execute();

    res.status(201).json(req.body);
});

langsControllers.get("/:id", async (req: Request, res: Response) => {
    const lang: LangType | null = await AppDataSource
        .getRepository(Lang)
        .createQueryBuilder("lang")
        .where("lang.id = :id", { id: req.params.id })
        .getOne();

    if (lang === null) {
        res.sendStatus(204); // no content
    } else {
        res.status(200).json(lang);
    }
});

langsControllers.delete("/:id", async (req: Request, res: Response) => {
    await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Lang)
        .where("id = :id", { id: req.params.id })
        .execute();

    res.sendStatus(204); // no content
});

langsControllers.put("/:id", validateLang, async (req: Request, res: Response) => {
    await AppDataSource
        .createQueryBuilder()
        .update(Lang)
        .set({ label: req.body.label })
        .where("id = :id", { id: req.params.id })
        .execute();

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default langsControllers;