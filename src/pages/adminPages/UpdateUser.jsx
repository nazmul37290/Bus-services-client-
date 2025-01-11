/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(
    userData && userData?.status
  );

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`).then((res) => {
      setUserData(res.data.data);
      setSelectedStatus(userData?.status);
    });
  }, [id, userData?.status]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const userName = e.target.username.value;
    const email = e.target.email.value;
    const status = e.target.status.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password != confirmPassword) {
      setError("Both passwords should be same");
      setLoading(false);
      return;
    }
    let updateUserData;
    if (password) {
      updateUserData = {
        userName,
        email,
        status,
        password,
      };
    } else {
      updateUserData = {
        userName,
        email,
        status,
      };
    }

    axios
      .patch(`${import.meta.env.VITE_BASE_URL}/users/${id}`, updateUserData)
      .then((res) => {
        toast.success("user updated successfully");
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
        Update User
      </h3>
      <form onSubmit={handleUpdateUser} className="mt-5 ">
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
              defaultValue={userData?.userName}
              name="username"
              id="username"
              placeholder="Enter your username..."
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="email"
            >
              EMAIL
            </label>
            <div>
              <input
                className="input input-bordered px-2 w-[500px]"
                type="email"
                name="email"
                defaultValue={userData?.email}
                id="email"
                placeholder="Enter your email..."
                readOnly
              />
              <p className="text-sm text-zinc-400 mt-1">
                Cannot update email, its readOnly
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="status"
            >
              STATUS
            </label>
            <div>
              <select
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
                name="status"
                className="select select-bordered w-[500px] "
                id="status"
                value={selectedStatus}
              >
                <option value="active">Active</option>
                <option value="disable">Disable</option>
              </select>
            </div>
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
              defaultValue={userData?.password}
              placeholder="Enter your password..."
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
              defaultValue={userData?.password}
              placeholder="Re-enter your password..."
            />
          </div>
          <p className="text-red-600 ">{error}</p>
          <button className="btn bg-teal-600 text-white mt-14">
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
