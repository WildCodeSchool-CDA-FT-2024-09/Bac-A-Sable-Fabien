import { Link } from "react-router-dom";
import { Lang } from "../types/langType";

const Header = ({ langs }) => {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-bold py-4">
        <Link to="/">My Repositories</Link>
      </h1>
      <nav className="w-full flex flex-row justify-between py-4">
        {langs.length ? (
          langs.map((lg: Lang) => <button key={lg.id}>{lg.label}</button>)
        ) : (
          <p>No Languages</p>
        )}
      </nav>
    </header>
  );
};

export default Header;
