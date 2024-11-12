import * as dotenv from "dotenv";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./database/data-source";
import RepoResolver from "./repo/repo.resolver";
import StatusResolver from "./status/status.resolver";
import LangResolver from "./lang/lang.resolver";
import CommentResolver from "./comment/comment.resolver";
import UserResolver from "./user/user.resolver";

dotenv.config();
const { PORT, AUTH_SECRET_KEY } = process.env;

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
    authChecker: ({ context }, roles): boolean => {
      console.log(context.cookie);
      console.log("roles", roles);

      // admin user (with the @Authorized() decorator in the resolver)
      if (roles.length > 0)
        return roles.some((role) => context.cookie.role === role);

      // other connected users
      if (context.cookie) return true;

      return false;
    },
  });

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
