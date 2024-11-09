import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useLoginLazyQuery } from "../generated/graphql-types";

const Root = () => {
  const [login] = useLoginLazyQuery();

  const handleLogin = async () => {
    await login({
      variables: {
        email: "f@feub.net",
        password: "argon2hash",
      },
    });
  };

  return (
    <div className="container mx-auto my-4">
      <Header />
      <button
        className="bg-slate-600 text-white px-2 py-1 rounded"
        type="button"
        onClick={handleLogin}
      >
        LOGIN
      </button>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
