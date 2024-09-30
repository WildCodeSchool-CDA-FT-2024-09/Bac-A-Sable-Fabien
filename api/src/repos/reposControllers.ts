import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { RepoType } from "./repos.types";
import Joi from "joi";
import { Repo } from "./repo.entity";
import { Like } from "typeorm";

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
        result = await Repo.findBy({
            name: Like(`%${name}%`)
        });
    } else {
        result = await Repo.find();
    }

    res.status(200).json(result);
});

reposControllers.post("/", validateRepo, async (req: Request, res: Response) => {
    const repo = new Repo();
    repo.id = req.body.id;
    repo.name = req.body.name;
    repo.url = req.body.url;
    repo.isPrivate = req.body.isPrivate;
    repo.save();

    res.status(201).json(req.body); // created
});

reposControllers.get("/:id", async (req: Request, res: Response) => {
    const result = await Repo.findBy({
        id: req.params.id
    });

    if (result === null) {
        res.sendStatus(204); // no content
    } else {
        res.status(200).json(result);
    }
});

reposControllers.delete("/:id", async (req: Request, res: Response) => {
    const repo = await Repo.findOneBy({ id: req.params.id });
    if (repo !== null) {
        repo.remove();
    }
    res.sendStatus(204);
});

reposControllers.put("/:id", validateRepo, async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, url, isPrivate } = req.body;

    const repo = await Repo.findOneBy({ id });
    if (repo !== null) {
        repo.name = name;
        repo.url = url;
        repo.isPrivate = isPrivate;
        repo.save();
    }

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default reposControllers;