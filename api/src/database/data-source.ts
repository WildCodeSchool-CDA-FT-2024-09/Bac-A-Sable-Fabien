import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Lang } from "../lang/lang.entity";
import { Repo } from "../repo/repo.entity";
import { Status } from "../status/status.entity";
import { Comment } from "../comment/comment.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "postgres",
  entities: [Lang, Repo, Status, Comment],
  synchronize: true, // /!\ only in dev
});
