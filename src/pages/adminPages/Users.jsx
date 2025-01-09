import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users`).then((result) => {
      setUsers(result.data.data);
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          All Users
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button className="btn bg-teal-600 text-base text-white ">
            <Link to={"create-user"} className="flex items-center gap-2">
              Create New{" "}
              <span>
                <CiCirclePlus size={25} />
              </span>
            </Link>
          </button>
          <div className="flex">
            <input
              type="search"
              className="border-teal-600 border rounded-md mr-1 px-4"
              name="search"
              placeholder="Search..."
              id="search"
            />
            <button className="btn bg-teal-600 text-lg text-white ">
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{user?.userName}</td>
                    <td className="font-semibold">{user?.email}</td>
                    <td className="font-semibold">encrypted_password</td>
                    <td>
                      <span
                        className={`${
                          user?.status === "active"
                            ? " bg-teal-600 font-semibold"
                            : "bg-red-600"
                        } badge text-white uppercase text-xs`}
                      >
                        {user?.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <Link to={`${user?.id}/update-user`}>
                          <FaRegEdit color="teal" size={20} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete("/users", user?.id, fetchUsers)
                          }
                        >
                          <IoTrashBin color="red" size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
