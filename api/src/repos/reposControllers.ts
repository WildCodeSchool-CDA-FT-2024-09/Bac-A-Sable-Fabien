import { Request, Response } from "express";
import { Router } from "express";
import { RepoType } from "./repos.types";
import { Repo } from "./repo.entity";
import { Like } from "typeorm";
import { validate } from "class-validator";

const reposControllers = Router();

reposControllers.get("/", async (req: Request, res: Response) => {
    const { name } = req.query;
    let repo: RepoType[];

    if (name) {
        try {
            repo = await Repo.findBy({
                name: Like(`%${name}%`)
            });
            res.status(200).json(repo);
        } catch (error) {
            res.sendStatus(500);
        }
    } else {
        try {
            repo = await Repo.find();
            res.status(200).json(repo);
        } catch (error) {
            res.sendStatus(500);
        }
    }
});

reposControllers.post("/", async (req: Request, res: Response) => {
    try {
        const repo = new Repo();
        repo.id = req.body.id;
        repo.name = req.body.name;
        repo.url = req.body.url;
        repo.isPrivate = req.body.isPrivate;

        const error = await validate(repo);
        if (error.length > 0) {
            res.status(422).json(error);
        } else {
            await repo.save();
            res.status(201).json(req.body); // created
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

reposControllers.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const repo = await Repo.findBy({ id });
        if (repo === null) {
            res.sendStatus(204); // no content
        } else {
            res.status(200).json(repo);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

reposControllers.delete("/:id", async (req: Request, res: Response) => {
    const repo = await Repo.findOneBy({ id: req.params.id });
    if (repo !== null) {
        await repo.remove();
    }
    res.sendStatus(204);
});

reposControllers.put("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, url, isPrivate } = req.body;

    try {
        const repo = await Repo.findOneBy({ id });
        if (repo !== null) {
            repo.name = name;
            repo.url = url;
            repo.isPrivate = isPrivate;

            const error = await validate(repo);
            if (error.length > 0) {
                res.status(422).json(error);
            } else {
                await repo.save();
                res.sendStatus(204); // No content (implying "resource updated successfully")
            }
        } else {
            res.sendStatus(204); // No content
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

export default reposControllers;