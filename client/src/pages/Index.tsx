import { useLoaderData } from "react-router-dom";
import { getRepos } from "../api/getData";
import { Link } from "react-router-dom";
import { Repo } from "../types/repoType";
import { Lang } from "../types/langType";

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
            <div
              className="bg-slate-100 p-4 rounded-md shadow-md"
              key={repo.id}
            >
              <h3 className="font-bold text-2xl">{repo.name}</h3>
              {repo.langs ? (
                repo.langs.map((lang: Lang) => {
                  <p>{lang.label}</p>;
                })
              ) : (
                <p>No Language</p>
              )}
              <Link to={`/repos/${repo.id}`}>See repo</Link>
            </div>
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
