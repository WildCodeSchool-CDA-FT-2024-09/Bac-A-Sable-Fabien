import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
