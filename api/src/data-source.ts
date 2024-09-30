import "reflect-metadata";
import { DataSource } from "typeorm";
import { Lang } from "./langs/lang.entity";
import { Repo } from "./repos/repo.entity";
import { Status } from "./status/status.entity";
import { Langbyrepo } from "./lang_by_repo/langbyrepo.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true, // /!\ only in dev
    logging: false,
    entities: [Lang, Repo, Status, Langbyrepo],
    migrations: [],
    subscribers: [],
});
