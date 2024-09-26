import { Response } from "express";
import { Router } from "express";
import status from "../../data/status.json";

const statusControllers = Router();

statusControllers.get("/", (_, res: Response) => {
    res.status(200).json(status);
});

export default statusControllers;