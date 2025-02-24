/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Buses = () => {
  const axiosSecure = useAxiosSecure();
  const [buses, setBuses] = useState([]);
  const [searchedBuses, setSearchedBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBuses = async () => {
    try {
      const result = await axiosSecure.get(`/buses`);
      setBuses(result.data.data);
      setSearchedBuses(result.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBuses();
  }, []);

  const handleSearch = () => {
    const inputValue = document.getElementById("searchBuses").value;
    if (!inputValue) {
      setSearchedBuses(buses);
    }
    const filteredBuses = buses.filter(
      (bus) =>
        bus?.routeDetails?.examName
          .toLowerCase()
          .includes(inputValue.toLowerCase()) |
        bus?.tripName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedBuses(filteredBuses);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          All Buses
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Link to={"create-bus"}>
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
              id="searchBuses"
            />
            <button
              onClick={handleSearch}
              className="btn bg-teal-600 text-lg text-white "
            >
              <FaMagnifyingGlass></FaMagnifyingGlass>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>TRIP NAME</th>
                <th>BUS NAME</th>
                <th>BUS TYPE</th>
                <th>TOTAL SEATS</th>
                <th>AVAILABLE SEATS</th>
                <th>EXAM NAME</th>
                <th>UNIT NAME</th>
                <th>BOARDING POINT</th>
                <th>ENDING POINT</th>
                <th>DEPARTURE DATE</th>
                <th>DEPARTURE TIME</th>
                <th>SEAT PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={15} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : (
                searchedBuses?.map((bus, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{bus?.tripName}</td>
                      <td>{bus?.busName}</td>
                      <td>{bus?.busType}</td>
                      <td>{bus?.totalSeats}</td>
                      <td>
                        {Number(bus?.totalSeats) -
                          Number(bus?.bookedSeats?.length)}
                      </td>
                      <td className="font-semibold">
                        {bus?.routeDetails?.examName}
                      </td>
                      <td className="font-semibold">
                        {bus?.unitDetails?.groupName}
                      </td>
                      <td className="font-semibold">{bus?.startingPoint}</td>
                      <td className="font-semibold">{bus?.endingPoint}</td>
                      <td className="font-semibold">{bus?.departureDate}</td>
                      <td className="font-semibold">{bus?.departureTime}</td>
                      <td className="font-semibold">{bus?.seatPrice}</td>
                      <td>
                        <span
                          className={`${
                            bus?.status === "active"
                              ? " bg-teal-600 font-semibold"
                              : "bg-red-600"
                          } badge text-white uppercase text-xs`}
                        >
                          {bus?.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-3">
                          <Link to={`${bus?.id}/update-bus`}>
                            <FaRegEdit color="teal" size={20} />
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete("/buses", bus?.id, fetchBuses)
                            }
                          >
                            <IoTrashBin color="red" size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Buses;
