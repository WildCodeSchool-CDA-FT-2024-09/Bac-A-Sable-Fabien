import { Link, useNavigate } from "react-router-dom";
import { Lang } from "../types/langType";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_LANGS = gql`
  query GetLangs {
    getLangs {
      id
      label
    }
  }
`;

const Header = () => {
  const { loading, error, data } = useQuery(GET_LANGS);

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  const handleLangFilter = (lg: Lang) => {
    setSearch("");
    navigate(`/?lang=${lg.label}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // setlangs([]);
    navigate(`/?name=${search}`);
  };

  const handleReset = () => {
    setSearch("");
    navigate("/");
  };

  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">
        <Link to="/">My Repositories</Link>
      </h1>
      <div className="mb-4 flex justify-center items-center gap-4">
        <form action="" onSubmit={handleSearch}>
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
          <button className="" onClick={handleReset}>
            &times;
          </button>
        )}
        {search && <p>Your current search: {search}</p>}
      </div>
      <nav className="w-full flex flex-row justify-between my-4">
        {data.getLangs.length ? (
          data.getLangs.map((lg: Lang) => (
            <button onClick={() => handleLangFilter(lg)} key={lg.id}>
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
