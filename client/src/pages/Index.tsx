import { useEffect, useState } from "react";
import axiosInstance from "../services/connection";
import { Repo } from "../types/repoType";
import RepoCard from "../components/RepoCard";
import { useSearchParams } from "react-router-dom";

const Index = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [searchParams] = useSearchParams();
  const searchLang =
    searchParams.get("lang") !== null
      ? "?lang=" + searchParams.get("lang")
      : "";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await axiosInstance.get<Repo[]>(
          `/api/repos${searchLang}`,
        );
        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, [searchParams]);

  return (
    <>
      {repos.length ? (
        <div className="w-full grid grid-cols-4 gap-4">
          {repos.map((repo: Repo) => (
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
