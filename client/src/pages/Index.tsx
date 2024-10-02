import { useLoaderData } from "react-router-dom";
import { getRepos } from "../api/getData";
import { Repo } from "../types/repoType";
import RepoCard from "../components/RepoCard";

export async function loader() {
  const repos = await getRepos();
  return { repos };
}

const Index = () => {
  const { repos } = useLoaderData();

  return (
    <>
      {repos.length ? (
        <div className="w-full grid grid-cols-4 gap-4">
          {repos.map((repo: Repo) => (
            <RepoCard key={repo.id} repo={repo} />
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
