import { useLoaderData } from "react-router-dom";
import { getLangs, getRepos } from "../api/getData";
import { Link } from "react-router-dom";
import { Repo } from "../types/repoType";
import { Lang } from "../types/langType";
import RepoCard from "../components/RepoCard";

export async function loader() {
  const repos = await getRepos();
  return { repos };
}

const Index = () => {
  const { repos } = useLoaderData();

  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {repos.length ? (
        <>
          {repos.map((repo) => (
            <RepoCard repo={repo} />
          ))}
        </>
      ) : (
        <p>
          <i>No Repositories</i>
        </p>
      )}
    </div>
  );
};

export default Index;
