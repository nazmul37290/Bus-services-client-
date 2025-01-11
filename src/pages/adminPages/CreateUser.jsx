/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreateUser = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password != confirmPassword) {
      setError("Both passwords should be same");
      setLoading(false);
      return;
    }
    const userData = {
      userName,
      email,
      password,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/users/create-user`, userData)
      .then((res) => {
        toast.success("user created successfully");
        navigate("/admin/users");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.errorSources[0].message);
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold text-teal-600 uppercase">
        Create User
      </h3>
      <form onSubmit={handleCreateUser} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="username"
            >
              USERNAME
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="email"
            >
              EMAIL
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="password"
            >
              password
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="password"
              name="confirmPassword"
              id="confirm-password"
              placeholder="Re-enter your password..."
              required
            />
          </div>
          <p className="text-red-600 ">{error}</p>
          <button className="btn bg-teal-600 text-white mt-14">
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
