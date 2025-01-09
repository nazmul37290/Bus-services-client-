import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";
import { UserContext } from "../../provider/AuthProvider";

const Units = () => {
  const [units, setUnits] = useState([]);
  const { user } = useContext(UserContext);
  const fetchUnits = async () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/units`).then((result) => {
      setUnits(result.data.data);
    });
  };
  useEffect(() => {
    fetchUnits();
  }, []);
  console.log(user);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold text-2xl mb-5 md:mb-0 uppercase">
          All Units
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button className="btn bg-teal-600 text-base text-white ">
            <Link to={"create-unit"} className="flex items-center gap-2">
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
                <th>UNIT NAME</th>
                <th>DATE OF EXAM</th>
                <th>EXAM NAME</th>
                <th>EXAM CENTER NAME</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {units?.map((unit, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{unit?.groupName}</td>
                    <td className="font-semibold">{unit?.dateOfExam}</td>
                    <td className="font-semibold">
                      {unit?.routeDetails?.examName}
                    </td>
                    <td className="font-medium">
                      {unit?.routeDetails?.examCenterName}
                    </td>
                    <td>
                      <span
                        className={`${
                          unit?.status === "active"
                            ? " bg-teal-600 font-semibold"
                            : "bg-red-600"
                        } badge text-white uppercase text-xs`}
                      >
                        {unit?.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <Link to={`${unit?.id}/update-unit`}>
                          <FaRegEdit color="teal" size={20} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete("/units", unit?.id, fetchUnits)
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

export default Units;
