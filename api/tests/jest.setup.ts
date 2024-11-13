import { beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "../src/database/data-source";

beforeAll(async () => await AppDataSource.initialize());

afterAll(async () => await AppDataSource.destroy());
