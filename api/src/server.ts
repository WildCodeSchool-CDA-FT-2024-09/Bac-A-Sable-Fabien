import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { AppDataSource } from "./database/data-source";
import RepoResolver from "./repo/repo.resolver";
import StatusResolver from "./status/status.resolver";
import LangResolver from "./lang/lang.resolver";
import CommentResolver from "./comment/comment.resolver";

(async () => {
    await AppDataSource.initialize();

    const schema = await buildSchema({
        resolvers: [StatusResolver, RepoResolver, LangResolver, CommentResolver],
    });

    const server = new ApolloServer({
        schema
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at: ${url}`);
})();