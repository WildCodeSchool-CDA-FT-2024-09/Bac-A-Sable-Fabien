import { GraphQLSchema, graphql, print } from "graphql";
import gql from "graphql-tag";
import getSchema from "../schema";

const GET_FILTERED_REPOS = gql`
  query GetFilteredRepos($lang: String, $name: String) {
    getFilteredRepos(lang: $lang, name: $name) {
      id
      name
      url
      isFavorite
      status {
        id
        label
      }
      langs {
        id
        label
      }
    }
  }
`;

// const keys = ["id", "name", "url", "isFavorite"];

describe("Repo resolvers", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("get all repos", async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_FILTERED_REPOS),
    })) as { data: { getFilteredRepos: Array<unknown> } };
    console.log(result);

    // vérification que la réponse est au format tableau
    expect(result.data.getFilteredRepos).toEqual(expect.any(Array));

    // vérification que chaque objet du tableau est bien l'ensemble des keys
    //expect(result.data.getFilteredRepos.forEach(el => ));
  });
});
