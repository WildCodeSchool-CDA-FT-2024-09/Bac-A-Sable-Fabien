import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div className="container mx-auto my-4">
      <Header />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
