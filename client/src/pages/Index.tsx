import { useEffect, useState } from "react";
import axiosInstance from "../services/connection";
import { Repo } from "../types/repoType";
import RepoCard from "../components/RepoCard";

const Index = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await axiosInstance.get<Repo[]>("/api/repos");
        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

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
