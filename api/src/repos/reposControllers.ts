import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import repos from "../../data/repo.json";
import lang_by_repo from "../../data/lang_by_repo.json";
import langs from "../../data/langs.json";
import { Repo } from "./repos.types";
import Joi from "joi";

const reposControllers = Router();

let myRepos: Repo[] = repos;

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

    if (error) {
        res.status(422).json(error);
    } else {
        next();
    }
};

reposControllers.get("/", (req: Request, res: Response) => {
    const { name } = req.query;
    const result = name === undefined ? myRepos : myRepos.filter((repo: Repo) => repo.name.includes(name as string));
    res.status(200).json(result);
});

reposControllers.post("/", validateRepo, (req: Request, res: Response) => {
    myRepos.push(req.body);
    res.status(201).json(req.body);
});

reposControllers.get("/:id", (req: Request, res: Response) => {
    // getting repo's languages
    const repo_languages: string[] = [];
    const langs_repo = lang_by_repo.filter(lbr => lbr.repo_id === req.params.id);
    if (langs_repo) {
        langs_repo.forEach(l => {
            const lng = langs.find(ll => ll.id === l.lang_id);
            if (lng) {
                repo_languages.push(lng?.label);
            }
        });
    }
    const repo = myRepos.find(rep => rep.id === req.params.id) as Repo;
    res.status(200).send({ ...repo, languages: repo_languages });
});

reposControllers.delete("/:id", (req: Request, res: Response) => {
    myRepos = myRepos.filter((repo: Repo) => repo.id !== req.params.id);
    res.sendStatus(204);
});

reposControllers.put("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, url, isPrivate } = req.body;

    myRepos = myRepos.map(repo => {
        if (repo.id === id) {
            return { ...repo, name, url, isPrivate };
        } else {
            return repo;
        }
    });

    res.sendStatus(204); // No content (implying "resource updated successfully")
});

export default reposControllers;