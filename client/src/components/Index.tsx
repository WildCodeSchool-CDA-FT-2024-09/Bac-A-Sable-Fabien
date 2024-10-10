import { useQuery, gql } from "@apollo/client";
import { Repo } from "../types/repoType";
import RepoCard from "./RepoCard";
import { useSearchParams } from "react-router-dom";

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

const Index = () => {
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get("name") ? searchParams.get("name") : null;
  const searchLang = searchParams.get("lang") ? searchParams.get("lang") : null;

  const { loading, error, data } = useQuery(GET_FILTERED_REPOS, {
    variables: {
      name: searchName,
      lang: searchLang,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  return (
    <>
      {data.getFilteredRepos.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.getFilteredRepos.map((repo: Repo) => (
            <RepoCard key={repo?.id} repo={repo} />
          ))}
        </div>
      ) : (
        <p>
          <i>No Repositories</i>
        </p>
      )}
    </>
  );
};

export default Index;
