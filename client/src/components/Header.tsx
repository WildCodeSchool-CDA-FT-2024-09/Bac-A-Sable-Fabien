import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetLangsQuery, Lang } from "../generated/graphql-types";

const Header = () => {
  const { loading, error, data } = useGetLangsQuery();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  const handleLangFilter = (lg: Lang) => {
    setSearch("");
    navigate(`/?lang=${lg.label}`);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/?name=${search}`);
  };

  const handleReset = () => {
    setSearch("");
    navigate("/");
  };

  const cleanFilters = () => {
    setSearch("");
  };

  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">
        <Link to="/" onClick={cleanFilters}>
          🦊 My Repositories
        </Link>
      </h1>
      <div className="mb-4 flex justify-center items-center gap-4 p-1 rounded-md border-gray-300 border bg-gray-300">
        <form action="" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            className="px-5 py-2.5 leading-7 text-base font-normal shadow-xs bg-lightgrey text-black border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
            placeholder="Search in repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        {search && (
          <div className="flex gap-x-2">
            <p>
              Current search: <strong>{search}</strong>
            </p>
            <button
              className="text-red-500 font-bold mr-1"
              onClick={handleReset}
            >
              &times;
            </button>
          </div>
        )}
      </div>
      <nav className="w-full flex flex-row justify-between my-4">
        {data && data.getLangs.length ? (
          data.getLangs.map((lg: Lang) => (
            <button
              className="border border-gray-300 hover:border-gray-300 hover:bg-gray-300 rounded px-1"
              onClick={() => handleLangFilter(lg)}
              key={lg.id}
            >
              {lg.label}
            </button>
          ))
        ) : (
          <p>No Languages</p>
        )}
      </nav>
    </header>
  );
};

export default Header;
