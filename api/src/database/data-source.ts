import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Lang } from "../lang/lang.entity";
import { Repo } from "../repo/repo.entity";
import { Status } from "../status/status.entity";
import { Comment } from "../comment/comment.entity";
import { User } from "../user/user.entity";

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Lang, Repo, Status, Comment, User],
  synchronize: true, // /!\ only in dev
});
