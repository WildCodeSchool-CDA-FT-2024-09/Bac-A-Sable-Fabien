import { Request, Response } from "express";
import { Router } from "express";
import repos from "../../data/repo.json";
import lang_by_repo from "../../data/lang_by_repo.json";
import langs from "../../data/langs.json";
import { Repo } from "./repos.types";

const reposControllers = Router();

reposControllers.get("/", (_, res: Response) => {
    res.status(200).json(repos);
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

    const repo = repos.find(rep => rep.id === req.params.id) as Repo;
    res.status(200).send({ ...repo, languages: repo_languages });
});

export default reposControllers;