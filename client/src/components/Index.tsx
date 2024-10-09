import { useQuery, gql } from "@apollo/client";
import { Repo } from "../types/repoType";
import RepoCard from "./RepoCard";
// import { useSearchParams } from "react-router-dom";

const GET_REPOS = gql`
  query GetRepos {
    getRepos {
      id
      name
      url
      isFavorite
      langs {
        id
        label
      }
      status {
        label
      }
    }
  }
`;

const Index = () => {
  const { loading, error, data } = useQuery(GET_REPOS);

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  // const [searchParams] = useSearchParams();
  // let searchQuery = "";
  // const searchLang =
  //   searchParams.get("lang") !== null
  //     ? "?lang=" + searchParams.get("lang")
  //     : "";
  // const searchName =
  //   searchParams.get("name") !== null ? "name=" + searchParams.get("name") : "";
  // if (searchLang !== "") {
  //   if (searchName !== "") {
  //     searchQuery += searchLang + "&" + searchName;
  //   } else {
  //     searchQuery += searchLang;
  //   }
  // } else {
  //   searchQuery += "?" + searchName;
  // }

  // console.log(searchQuery);

  return (
    <>
      {data.getRepos.length ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.getRepos.map((repo: Repo) => (
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
