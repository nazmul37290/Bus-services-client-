import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
const PrivateRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("no token");
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    axiosSecure
      .post("/auth/check")
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setLoading(false);
        console.log(isLoggedIn);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoading(false);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [axiosSecure]);
  if (loading) {
    return <span className="loading loading-dots loading-sm"></span>;
  }
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
