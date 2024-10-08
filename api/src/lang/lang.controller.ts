import { Request, Response } from "express";
import { Router } from "express";
import { Lang } from "./lang.entity";
import { validate } from "class-validator";
import { LangType } from "./lang.type";

const langController = Router();

langController.get("/", async (_: any, res: Response) => {
    try {
        const langs: LangType[] = await Lang.find();
        res.status(200).send(langs);
    } catch (error) {
        res.sendStatus(500);
    }
});

langController.post("/", async (req: Request, res: Response) => {
    try {
        const lang = new Lang();
        lang.label = req.body.label;

        const error = await validate(lang);
        if (error.length > 0) {
            res.status(422).json(error);
        } else {
            lang.save();
            res.status(201).json(req.body); // created
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

langController.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const lang = await Lang.findOneBy({ id });
        if (lang === null) {
            res.sendStatus(204); // no content
        } else {
            res.status(200).json(lang);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

langController.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const lang = await Lang.findOneBy({ id });
        if (lang !== null) {
            await lang.remove();
        }
        res.sendStatus(204); // no content
    } catch (error) {
        res.sendStatus(500);
    }
});

langController.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    try {
        const lang = await Lang.findOneBy({ id });
        if (lang !== null) {
            lang.label = req.body.label;

            const error = await validate(lang);
            if (error.length > 0) {
                res.status(422).json(error);
            } else {
                await lang.save();
                res.sendStatus(204); // No content
            }
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

export default langController;