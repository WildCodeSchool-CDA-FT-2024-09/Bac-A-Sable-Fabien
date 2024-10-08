import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Lang } from "../lang/lang.entity";
import { Repo } from "../repo/repo.entity";
import { Status } from "../status/status.entity";
import { Comment } from "../comment/comment.entity";

dotenv.config();
const { DATABASE_FILE } = process.env;

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${DATABASE_FILE}`,
    synchronize: true, // /!\ only in dev
    logging: false,
    entities: [Lang, Repo, Status, Comment],
    migrations: [],
    subscribers: [],
});
