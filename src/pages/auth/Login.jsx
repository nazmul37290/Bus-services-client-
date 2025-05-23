import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userData = { email, password };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/login`, userData, {
        withCredentials: true,
        // timeout: 50000,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("token", res.data.data.token);
        setUser(res.data.data.user);
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "ECONNABORTED") {
          setError("Request timed out. Please try again.");
        } else {
          setError(
            err.response?.data?.message ||
              "An error occurred. Please try again."
          );
        }
        setLoading(false);
      });
  };

  const handleForgetPassword = () => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/auth/forget-password`, {
        email: document.querySelector("#userEmail").value,
      })
      .then((res) => {
        console.log(res);
        toast.success("Password reset link sent to your email.");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      });
  };

  return (
    <div>
      <div className="hero bg-teal-600 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white mb-4">Login now!</h1>
          </div>
          <div className="card bg-teal-700 w-[320px] sm:w-[400px]  max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="userEmail"
                  className="input input-bordered dark:bg-zinc-100"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered dark:bg-zinc-100"
                  required
                />
                <label className="label">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="label-text-alt link link-hover text-white"
                  >
                    Forgot password?
                  </button>
                </label>
              </div>
              <p className=" text-red-400">{error}</p>
              <div className="form-control ">
                <button
                  type="submit"
                  className="btn bg-teal-500 border-none text-white"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <Link to={"/"}>
                <button className="btn w-full mt-4 bg-transparent font-semibold text-white dark:border-white">
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
