import { Link } from "react-router-dom";
import { Lang } from "../types/langType";
import { Repo } from "../types/repoType";
import FavoriteButton from "./FavoriteButton";

const RepoCard = ({ repo }: { repo: Repo }) => {
  return (
    <div
      className="bg-white hover:bg-gray-300 p-4 rounded-md shadow-md"
      key={repo?.id}
    >
      <h3 className="font-bold text-2xl mb-1">
        <Link className="underline " to={`/repos/${repo?.id}`}>
          {repo?.name}
        </Link>
        <FavoriteButton repo={repo} />
      </h3>
      <p className="mb-2 text-sm">
        <Link className="text-slate-600" to={`${repo?.url}`}>
          Got to GitHub Repo
        </Link>
      </p>
      {repo?.langs.length ? (
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
