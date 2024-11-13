import * as dotenv from "dotenv";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "./database/data-source";
import getSchema from "./schema";

dotenv.config();
const { PORT, AUTH_SECRET_KEY } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      console.info(req.headers.cookie);

      if (!req.headers.cookie) return { res };

      const { repo_token } = setCookie.parse(req.headers.cookie as string, {
        map: true,
      });

      if (!repo_token) return { res };

      const payload = jwt.verify(repo_token.value, AUTH_SECRET_KEY as string);

      if (!payload) return { res };

      return { res, cookie: payload };
    },
  });

  console.log(`🚀 Dockerized server ready at: ${url}`);
})();
