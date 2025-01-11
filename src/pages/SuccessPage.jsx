/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pnrNumber, setPnrNumber] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const trxId = queryParams.get("trxID");
    if (!trxId) {
      navigate("/");
      return;
    }

    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    if (!bookingData) {
      navigate("/");
      return;
    }
    bookingData.transactionId = trxId;
    setTransactionID(trxId);
    if (transactionID) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/bookings/create-booking`,
          bookingData
        )
        .then((res) => {
          if (res.data.success === true) {
            setPnrNumber(res.data.data[0].pnrNumber);
            localStorage.removeItem("bookingData");
          }
        })
        .catch((err) => {
          navigate("/");
        })
        .finally(() => setLoading(false));
    }
  }, [location.search, navigate, transactionID]);

  return (
    (loading && (
      <div className="max-w-screen-xl flex flex-col justify-center items-center min-h-[calc(100vh-400px)] mx-auto my-10">
        <span className="loading loading-dots loading-sm"></span>
      </div>
    )) || (
      <div className="max-w-screen-xl flex flex-col justify-center items-center min-h-[calc(100vh-400px)] mx-auto my-10">
        <h3 className="text-3xl font-bold text-teal-600 my-4">
          Your booking was successful!
        </h3>
        <p className="mt-2">
          Your booking transaction ID :{" "}
          <span className="text-teal-600 font-semibold">{transactionID}</span>
        </p>
        <p className="mt-2">
          Your booking PNR number :{" "}
          <span className="text-teal-600 font-semibold">{pnrNumber}</span>{" "}
        </p>
        <p className="mt-2">
          Thank you for choosing our bus services. <b>copy the PNR number</b>{" "}
          and grab your ticket now..
        </p>
        <div className="text-center">
          <Link to={"/tickets"}>
            <button className="btn bg-teal-600 my-5 text-white uppercase">
              Get Ticket
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default SuccessPage;
