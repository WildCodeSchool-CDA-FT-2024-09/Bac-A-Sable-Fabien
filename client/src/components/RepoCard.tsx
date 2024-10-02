import { Link } from "react-router-dom";

const RepoCard = ({ repo }) => {
  return (
    <div className="bg-slate-100 p-4 rounded-md shadow-md" key={repo.id}>
      <h3 className="font-bold text-2xl">{repo.name}</h3>
      <p className="mb-2 text-sm">
        <Link to={`/repos/${repo.id}`}>See Repo</Link>
      </p>
      {repo.langs ? (
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
        <p>No Language</p>
      )}
    </div>
  );
};

export default RepoCard;
