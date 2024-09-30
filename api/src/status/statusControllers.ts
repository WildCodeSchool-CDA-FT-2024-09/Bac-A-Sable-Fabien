import { Request, Response } from "express";
import { Router } from "express";
import { Status } from "./status.entity";

const statusControllers = Router();

statusControllers.get("/", async (_, res: Response) => {
    const result = await Status.find();

    res.status(200).json(result);
});

statusControllers.post("/", (req: Request, res: Response) => {
    const status = new Status();
    status.label = req.body.label;
    status.save();

    res.status(201).json(req.body); // created
});

export default statusControllers;