import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Layout = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const storedSettings = JSON.parse(localStorage.getItem("settings"));
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/settings`
        );
        const { data } = res.data;
        if (data) {
          setSettings(data);
          localStorage.setItem("settings", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading && !storedSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <Navbar settings={storedSettings ? storedSettings : settings}></Navbar>
      <Outlet></Outlet>
      <Footer settings={storedSettings ? storedSettings : settings}></Footer>
    </div>
  );
};

export default Layout;
