import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

const useAxiosSecure = () => {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      function (config) {
        console.log("req intercepted");
        const token = localStorage.getItem("token");
        config.headers.Authorization = token;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);
  return axiosSecure;
};

export default useAxiosSecure;
