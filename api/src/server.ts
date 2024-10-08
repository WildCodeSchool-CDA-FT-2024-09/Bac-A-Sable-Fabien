import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import repos from "../data/repo.json";

const typeDefs = `#graphql
  type Repo {
    id: String
    name: String
    url: String
  }

  type Query {
    repos: [Repo]
  }
`;

const resolvers = {
    Query: {
        repos: () => repos,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

(async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
})();