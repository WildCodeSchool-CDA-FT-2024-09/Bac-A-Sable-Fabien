import { Link, useNavigate } from "react-router-dom";
import { Lang } from "../types/langType";
import { useEffect, useState } from "react";
import axiosInstance from "../services/connection";

const Header = () => {
  const [langs, setlangs] = useState<Lang[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLangs = async () => {
      try {
        const langs = await axiosInstance.get<Lang[]>("/api/langs");
        setlangs(langs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLangs();
  }, [langs]);

  const handleLangFilter = (lg: Lang) => {
    setSearch("");
    navigate(`/?lang=${lg.label}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setlangs([]);
    navigate(`/?name=${search}`);
  };

  const handleReset = (e) => {
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
        {langs.length ? (
          langs.map((lg: Lang) => (
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
