import { Link, useParams } from "react-router-dom";
import axiosInstance from "../services/connection";
// import { Repo } from "../types/repoType";
// import { useState } from "react";

const RepoCard = ({ repo }) => {
  const { id } = useParams();
  // const [repo, setRepo] = useState<Repo>();

  const handleLike = async () => {
    try {
      await axiosInstance.patch(`/api/repos/${id}`, {
        isFavorite: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="bg-white hover:bg-gray-300 p-4 rounded-md shadow-md"
      key={repo.id}
    >
      <h3 className="font-bold text-2xl mb-1">
        <Link className="underline " to={`/repos/${repo.id}`}>
          {repo.name}
        </Link>
        <button
          className="rounded px-1 ml-2 text-sm font-normal bg-red-400 text-white"
          type="button"
          onClick={handleLike}
        >
          Like
        </button>
      </h3>
      <p className="mb-2 text-sm">
        <Link className="text-slate-600" to={`${repo.url}`}>
          Got to GitHub Repo
        </Link>
      </p>
      {repo.langs.length ? (
        <>
          <p>Languages:</p>
          <ul>
            {repo.langs.map((lang: Lang) => (
              <li className="list-disc ml-5" key={lang.id}>
                {lang.label}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          <i className="text-slate-400">No Language</i>
        </p>
      )}
    </div>
  );
};

export default RepoCard;
