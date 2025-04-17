/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { UserContext } from "../provider/AuthProvider";
const PrivateRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    axiosSecure
      .post("/auth/check")
      .then((res) => {
        const user = res.data.data;
        setUser({ email: user.email, userName: user.userName });
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoading(false);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [axiosSecure, isLoggedIn, navigate, setUser]);
  if (loading) {
    return <span className="loading loading-dots loading-sm"></span>;
  }
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
