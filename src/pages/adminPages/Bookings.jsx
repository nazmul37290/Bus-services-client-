/* eslint-disable no-unused-vars */
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
  const [searchedBookings, setSearchedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBookings = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bookings`)
      .then((result) => {
        setBookings(result.data.data);
        setSearchedBookings(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSearch = () => {
    const inputValue = document.getElementById("searchBookings").value;
    if (!inputValue) {
      setSearchedBookings(bookings);
    }
    const filteredBookings = bookings.filter(
      (booking) =>
        booking?.name.toLowerCase().includes(inputValue.toLowerCase()) |
        booking?.contactNumber
          .toLowerCase()
          .includes(inputValue.toLowerCase()) |
        booking?.transactionId.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedBookings(filteredBookings);
  };
  console.log(bookings);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          All Bookings
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <Link to={"create-booking"}>
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
              id="searchBookings"
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
                <th>NAME</th>
                <th>CONTACT NUMBER</th>
                <th>EMAIL</th>
                <th>GENDER</th>
                <th>TRIP NAME</th>
                <th>BUS NAME</th>
                <th>SEATS</th>
                <th>TOTAL AMOUNT</th>
                <th>PAYMENT BY</th>
                <th>TRANSACTION ID</th>
                <th>PNR NUMBER</th>
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
                searchedBookings?.map((booking, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold">{booking?.name}</td>
                      <td className="font-semibold">
                        {booking?.contactNumber}
                      </td>
                      <td className="font-semibold">{booking?.email}</td>
                      <td className="font-medium">{booking?.gender}</td>
                      <td className="font-medium">
                        {booking?.busDetails?.tripName}
                      </td>
                      <td className="font-medium">
                        {booking?.busDetails?.busName}
                      </td>
                      <td className="font-medium">
                        {booking?.seats.join(",")}
                      </td>
                      <td className="font-medium">{booking?.totalPrice}</td>
                      <td className="font-medium uppercase">
                        {booking?.paymentMethod}
                      </td>
                      <td className="font-medium">{booking?.transactionId}</td>
                      <td className="font-medium">{booking?.pnrNumber}</td>
                      <td>
                        <span
                          className={`${
                            booking?.status === "booked"
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
