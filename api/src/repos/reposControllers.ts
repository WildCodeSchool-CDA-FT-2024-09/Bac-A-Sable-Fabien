import { Request, Response } from "express";
import { Router } from "express";
import { Repo } from "./repo.entity";
import { Like } from "typeorm";
// import { validate } from "class-validator";
import { Status } from "../status/status.entity";
import { Lang } from "../langs/lang.entity";

const reposControllers = Router();

reposControllers.get("/", async (req: Request, res: Response) => {
    const { name } = req.query;
    let repos;

    if (name) {
        try {
            repos = await Repo.find({
                where: {
                    name: Like(`%${name}%`)
                },
                relations: {
                    status: true,
                    langs: true
                }
            });
            res.status(200).json(repos);
        } catch (error) {
            res.sendStatus(500);
        }
    } else {
        try {
            repos = await Repo.find({
                relations: {
                    status: true,
                    langs: true
                }
            });
            res.status(200).json(repos);
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

        // status
        const status = await Status.findOneOrFail({
            where: {
                id: req.body.isPrivate
            }
        });
        repo.status = status;

        // add langs
        // ICI il faut jouer avec lang_by_repo.json
        // const langIds: number[] = req.body.langs;
        // const langs = await Lang.findByIds(langIds);
        // repo.langs = langs;

        // const error = await validate(repo);
        // if (error.length > 0) {
        //     res.status(422).json(error);
        // } else {
        await repo.save();
        res.status(201).json(req.body); // created
        // }
    } catch (error) {
        res.sendStatus(500);
    }
});

reposControllers.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const repo = await Repo.find({
            where: {
                id
            },
            relations: {
                status: true
            }
        });
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

            // status
            const status = await Status.findOneOrFail({
                where: {
                    id: isPrivate
                }
            });
            repo.status = status;

            // add langs
            const langIds: number[] = req.body.langs;
            const langs = await Lang.findByIds(langIds);
            repo.langs = langs;

            // const error = await validate(repo);
            // if (error.length > 0) {
            //     res.status(422).json(error);
            // } else {
            await repo.save();
            res.sendStatus(204); // No content (implying "resource updated successfully")
            // }
        } else {
            res.sendStatus(204); // No content
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

export default reposControllers;