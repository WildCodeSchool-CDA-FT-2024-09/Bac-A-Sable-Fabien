import "reflect-metadata";
import { DataSource } from "typeorm";
import { Lang } from "./langs/lang.entity";
import { Repo } from "./repos/repo.entity";
import { Status } from "./status/status.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, // /!\ only in dev
    logging: false,
    entities: [Lang, Repo, Status],
    migrations: [],
    subscribers: [],
});
