import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";

const BusRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const fetchRoutes = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/bus-routes`).then((result) => {
      setRoutes(result.data.data);
    });
  };
  useEffect(() => {
    fetchRoutes();
  }, []);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          All Bus Routes
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Link to={"create-route"}>
            <button className="btn bg-teal-600 text-base text-white flex items-center gap-2">
              Create New{" "}
              <span>
                <CiCirclePlus size={25} />
              </span>
            </button>
          </Link>
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
                <th>EXAM NAME</th>
                <th>EXAM LOCATION</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {routes?.map((route, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{route?.examName}</td>
                    <td className="font-medium">{route?.examCenterName}</td>
                    <td>
                      <span
                        className={`${
                          route?.status === "active"
                            ? " bg-teal-600 font-semibold"
                            : "bg-red-600"
                        } badge text-white uppercase text-xs`}
                      >
                        {route?.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <Link to={`${route?.id}/update-route`}>
                          <FaRegEdit color="teal" size={20} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete("/bus-routes", route?.id, fetchRoutes)
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

export default BusRoutes;
