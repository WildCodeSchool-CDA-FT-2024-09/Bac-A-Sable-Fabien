import { useParams } from "react-router-dom";
import Comments from "./Comments";
import FavoriteButton from "./FavoriteButton";
import {
  useGetRepoQuery,
  Lang,
  GetRepoQueryVariables,
} from "../generated/graphql-types";

const Repo = () => {
  const { repoId } = useParams<string>();
  const { loading, error, data } = useGetRepoQuery({
    variables: { repoId } as GetRepoQueryVariables,
  });

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  return (
    <div id="repo">
      {data && data.getRepo ? (
        <div className="bg-slate-100 rounded-lg shadow-lg p-2 mb-2">
          <h2 className="font-bold text-3xl pb-4">
            {data.getRepo.name}
            <span
              className={`${
                data.getRepo.status.label === "private"
                  ? "bg-red-400"
                  : "bg-green-400"
              } rounded px-1 ml-2 text-sm`}
            >
              {data.getRepo.status.label}
            </span>
          </h2>
          <FavoriteButton repo={data.getRepo} />

          {data.getRepo.url && (
            <p className="pb-4">
              <a target="_blank" href={data.getRepo.url}>
                Project URL: {data.getRepo.url}
              </a>
            </p>
          )}

          {data.getRepo.langs.length > 0 && (
            <div className="mb-4">
              <p>Languages:</p>
              <ul>
                {data.getRepo.langs.map((lang: Lang) => (
                  <li className="list-disc ml-5" key={lang.id}>
                    {lang.label} {lang.id}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Comments repoId={repoId!} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Repo;
