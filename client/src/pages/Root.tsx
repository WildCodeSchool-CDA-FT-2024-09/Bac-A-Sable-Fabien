import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getLangs } from "../api/getData";
import Header from "../components/Header";
// import { Repo } from "../types/repoType";

export async function loader() {
  const langs = await getLangs();
  return { langs };
}

const Root = () => {
  const { langs } = useLoaderData();

  return (
    <div className="container mx-auto">
      <Header langs={langs} />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
