import { useParams } from "react-router-dom";
import { Repo as RepoType } from "../types/repoType";
import { useEffect, useState } from "react";
import axiosInstance from "../services/connection";
import Comments from "./Comments";

const Repo = () => {
  const [repo, setRepo] = useState<RepoType>(null);
  const { repoId } = useParams();

  const handleLike = async () => {
    try {
      await axiosInstance.patch(`/api/repos/${repoId}`, {
        isFavorite: !repo?.isFavorite,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const repo = await axiosInstance.get<RepoType>(`/api/repos/${repoId}`);
        setRepo(repo.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepo();
  }, []);

  return (
    <div id="repo">
      {repo ? (
        <div className="bg-slate-100 rounded-lg shadow-lg p-2 mb-2">
          <h2 className="font-bold text-3xl pb-4">
            {repo.name}
            <span
              className={`${
                repo.status.label === "private" ? "bg-red-400" : "bg-green-400"
              } rounded px-1 ml-2 text-sm`}
            >
              {repo.status.label}
            </span>
          </h2>
          <button
            className="rounded px-1 ml-2 text-sm font-normal bg-red-400 text-white"
            type="button"
            onClick={handleLike}
          >
            Like
          </button>

          {repo.url && (
            <p className="pb-4">
              <a target="_blank" href={repo.url}>
                Project URL: {repo.url}
              </a>
            </p>
          )}

          {repo.langs.length > 0 && (
            <div className="mb-4">
              <p>Languages:</p>
              <ul>
                {repo.langs.map((lang) => (
                  <li className="list-disc ml-5" key={lang.id}>
                    {lang.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Comments repoId={repoId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Repo;
