import * as dotenv from "dotenv";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./database/data-source";
import RepoResolver from "./repo/repo.resolver";
import StatusResolver from "./status/status.resolver";
import LangResolver from "./lang/lang.resolver";
import CommentResolver from "./comment/comment.resolver";
import UserResolver from "./user/user.resolver";

dotenv.config();
const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [
      StatusResolver,
      RepoResolver,
      LangResolver,
      CommentResolver,
      UserResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      console.log(req.httpVersion);
      return { res };
    },
  });

  console.log(`🚀 Dockerized server ready at: ${url}`);
})();
