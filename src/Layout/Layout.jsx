import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <h1>This is footer</h1>
    </div>
  );
};

export default Layout;
