import { Link, useNavigate } from "react-router-dom";
import { Lang } from "../types/langType";
import { useEffect, useState } from "react";
import axiosInstance from "../services/connection";

const Header = () => {
  const [langs, setlangs] = useState<Lang[]>([]);
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
  }, []);

  const handleLangFilter = (lg: Lang) => {
    navigate(`/?lang=${lg.label}`);
  };

  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-bold py-4">
        <Link to="/">My Repositories</Link>
      </h1>
      <nav className="w-full flex flex-row justify-between py-4">
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
