import { Response } from "express";
import { Router } from "express";
import { StatusType } from "./status.types";
import { AppDataSource } from "../data-source";
import { Status } from "./status.entity";

const statusControllers = Router();

statusControllers.get("/", async (_, res: Response) => {
    const result: StatusType[] = await AppDataSource
        .getRepository(Status)
        .createQueryBuilder("status")
        .getMany();

    res.status(200).json(result);
});

export default statusControllers;