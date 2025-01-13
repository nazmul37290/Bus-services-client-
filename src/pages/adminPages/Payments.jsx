/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUnits = async () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/payment`)
      .then((result) => {
        setPayments(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchUnits();
  }, []);
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-teal-600 font-semibold text-2xl mb-5 md:mb-0 uppercase">
          All Payments
        </h3>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* <Link to={"create-unit"}>
              <button className="btn bg-teal-600 text-base text-white flex items-center gap-2">
                Create New{" "}
                <span>
                  <CiCirclePlus size={25} />
                </span>
              </button>
            </Link> */}
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
              <tr className="uppercase">
                <th>SL</th>
                <th>NAME</th>
                <th>Contact Number</th>
                <th>Booking id </th>
                <th>payment method</th>
                <th>total amount</th>
                <th>transaction id</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    <span className="loading loading-dots loading-md"></span>
                  </td>
                </tr>
              ) : (
                payments?.map((payment, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold">
                        {payment?.bookingId?.name}
                      </td>
                      <td className="font-semibold">
                        {payment?.bookingId?.contactNumber}
                      </td>
                      <td className="font-semibold">
                        {payment?.bookingId?._id}
                      </td>
                      <td className="font-medium uppercase">
                        {payment?.paymentMethod}
                      </td>
                      <td className="font-medium">
                        {payment?.bookingId?.totalPrice}
                      </td>
                      <td className="font-medium">
                        {payment?.bookingId?.transactionId}
                      </td>
                      {/* <td>
                      <div className="flex gap-3">
                        <Link to={``}>
                          <FaRegEdit color="teal" size={20} />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete("/payments", payment?.id, fetchUnits)
                          }
                        >
                          <IoTrashBin color="red" size={20} />
                        </button>
                      </div>
                    </td> */}
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

export default Payments;
