import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import { Link } from "react-router";
import handleDelete from "../../utils/delete";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/bookings`).then((result) => {
      setBookings(result.data.data);
    });
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-teal-600 font-semibold text-2xl uppercase">
          All Bookings
        </h3>
        <div className="flex items-center gap-5">
          <button className="btn bg-teal-600 text-base text-white ">
            <Link className="flex items-center gap-2">
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
          <table className="table table-xs table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>NAME</th>
                <th>CONTACT NUMBER</th>
                <th>EMAIL</th>
                <th>GENDER</th>
                <th>TRIP NAME</th>
                <th>BUS NAME</th>
                <th>SEATS</th>
                <th>TOTAL AMOUNT</th>
                <th>TRANSACTION ID</th>
                <th>PNR NUMBER</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((booking, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{booking?.name}</td>
                    <td className="font-semibold">{booking?.contactNumber}</td>
                    <td className="font-semibold">{booking?.email}</td>
                    <td className="font-medium">{booking?.gender}</td>
                    <td className="font-medium">
                      {booking?.busDetails?.tripName}
                    </td>
                    <td className="font-medium">
                      {booking?.busDetails?.busName}
                    </td>
                    <td className="font-medium">{booking?.seats.join(",")}</td>
                    <td className="font-medium">{booking?.totalPrice}</td>
                    <td className="font-medium">{booking?.transactionId}</td>
                    <td className="font-medium">{booking?.pnrNumber}</td>
                    <td>
                      <span
                        className={`${
                          booking?.status === "active"
                            ? " bg-teal-600 font-semibold"
                            : "bg-red-600"
                        } badge text-white uppercase text-xs`}
                      >
                        {booking?.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-3">
                        <Link to={""}>
                          <FaRegEdit color="teal" size={20} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(
                              "/bookings",
                              booking?.id,
                              fetchBookings
                            )
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

export default Bookings;
