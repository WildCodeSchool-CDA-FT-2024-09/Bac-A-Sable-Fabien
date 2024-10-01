import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Lang } from "../langs/lang.entity";
import { Repo } from "../repos/repo.entity";
import { Status } from "../status/status.entity";

dotenv.config();
const { DATABASE_FILE } = process.env;

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${DATABASE_FILE}`,
    synchronize: true, // /!\ only in dev
    logging: false,
    entities: [Lang, Repo, Status],
    migrations: [],
    subscribers: [],
});
