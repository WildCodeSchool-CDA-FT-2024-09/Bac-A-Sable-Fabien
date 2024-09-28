import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { RepoType } from "./repos.types";
import Joi from "joi";
import { AppDataSource } from "../data-source";
import { Repo } from "./repo.entity";

const reposControllers = Router();

// validation schema
const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    isPrivate: Joi.number().min(1).max(2).required(),
});

// middleware for validation
const validateRepo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error == null) {
        next();
    } else {
        res.status(422).json(error);
    }
};

reposControllers.get("/", async (req: Request, res: Response) => {
    const { name } = req.query;
    let result: RepoType[];

    if (name) {
        result = await AppDataSource
            .getRepository(Repo)
            .createQueryBuilder("repo")
            .where("name like :name", { name: `%${name}%` })
            .getMany();
    } else {
        result = await AppDataSource
            .getRepository(Repo)
            .createQueryBuilder("repo")
            .getMany();
    }

    res.status(200).json(result);
});

reposControllers.post("/", validateRepo, async (req: Request, res: Response) => {
    await AppDataSource
        .createQueryBuilder()
        .insert()
        .into("Repo")
        .values([
            {
                id: req.body.id,
                name: req.body.name,
                url: req.body.url,
                isPrivate: req.body.isPrivate
            }
        ])
        .execute();

    res.status(201).json(req.body); // created
});

reposControllers.get("/:id", async (req: Request, res: Response) => {
    const result: RepoType | null = await AppDataSource
        .getRepository(Repo)
        .createQueryBuilder("repo")
        .where("id = :id", { id: req.params.id })
        .getOne();

    if (result === null) {
        res.sendStatus(204); // no content
    } else {
        res.status(200).json(result);
    }
});

reposControllers.delete("/:id", async (req: Request, res: Response) => {
    const result = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Repo)
        .where("id = :id", { id: req.params.id })
        .execute();

    if (result.affected === 0) {
        res.sendStatus(204); // better http code?
    } else {
        res.sendStatus(204);
    }
});

reposControllers.put("/:id", validateRepo, async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, url, isPrivate } = req.body;

    const result = await AppDataSource
        .createQueryBuilder()
        .update(Repo)
        .set({
            name,
            url,
            isPrivate
        })
        .where("id = :id", { id })
        .execute();

    console.log(result);

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default reposControllers;