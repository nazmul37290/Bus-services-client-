import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useEffect } from "react";
import axios from "axios";

const Layout = () => {
  useEffect(() => {
    const fetchSettings = async () => {
      axios.get(`${import.meta.env.VITE_BASE_URL}/settings`).then((res) => {
        const { data } = res.data;
        if (data) {
          localStorage.setItem("settings", JSON.stringify(data));
        }
      });
    };
    fetchSettings();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
