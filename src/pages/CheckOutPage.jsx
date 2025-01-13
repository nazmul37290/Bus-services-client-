import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const CheckOutPage = () => {
  const [bus, setBus] = useState();
  const [error, setError] = useState("");

  const { totalPrice, bookedSeats, busId, id } = useLocation().state;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/buses/${busId}`)
      .then((res) => setBus(res.data.data));
  }, [busId]);
  let totalPayableAmount = Number(totalPrice) + (Number(totalPrice) * 2) / 100;
  const handleData = async (e) => {
    e.preventDefault();
    const form = e.target;
    let bookinDetails = {};
    bookinDetails.name = form.name.value;
    bookinDetails.contactNumber = form.contactNumber.value;
    bookinDetails.email = form.email.value;
    bookinDetails.gender = form.gender.value;
    bookinDetails.busId = id;
    bookinDetails.seats = bookedSeats;
    bookinDetails.totalPrice = totalPayableAmount;
    bookinDetails.paymentMethod = "bkash";

    try {
      const paymentRes = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/payment/bkash/create`,
        { amount: totalPayableAmount }
      );

      if (
        paymentRes?.data?.success === true &&
        paymentRes?.data?.data?.bkashURL
      ) {
        localStorage.setItem("bookingData", JSON.stringify(bookinDetails));
        window.location.href = paymentRes?.data?.data?.bkashURL;
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center sm:items-start sm:justify-between mt-4 bg-teal-50">
        <form onSubmit={handleData} className="w-full sm:w-1/2 p-10">
          <label className=" text-base font-medium" htmlFor="name">
            Name: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here..."
            className="input input-bordered w-full max-w-xs my-2"
            required
          />
          <br />
          <label className=" text-base font-medium" htmlFor="gender">
            Gender: <span className="text-red-500">*</span>
          </label>
          <br />
          <select
            className="select select-bordered w-full max-w-xs my-2"
            name="gender"
            id="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br />
          <label
            className=" text-base font-medium mb-5"
            htmlFor="contactNumber"
          >
            Contact Number: <span className="text-red-500">*</span>
          </label>
          <br />
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter your contact number here..."
            className="input input-bordered w-full max-w-xs my-2"
            required
          />
          <br />
          <label className=" text-base font-medium mb-5" htmlFor="email">
            Email:
          </label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email here..."
            className="input input-bordered w-full max-w-xs my-2"
          />
          <br />
          <p className="text-red-600">{error}</p>
          <button
            type="submit"
            className="btn btn-lg mt-10 bg-white text-teal-600"
          >
            Pay with Bkash
            <img src="/assets/bkash.png" className="w-14" alt="bkash-logo" />
          </button>
        </form>
        <div className="w-full px-4 sm:w-1/2 mt-4">
          <h3 className="text-white bg-teal-600 rounded-md p-2 flex items-center px-10 mr-10 gap-2  text-lg font-semibold">
            Booking Details
          </h3>
          <div className="overflow-x-auto ml-4">
            <p className="text-xl font-semibold  my-1">{bus?.tripName}</p>
            <table className="">
              {/* head */}
              <thead>
                <tr>
                  <td className="font-semibold">Bus name </td>
                  <td className="text-center px-5">: </td>
                  <td>{bus?.busName}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Exam Date </td>
                  <td className="text-center px-5">: </td>
                  <td>{bus?.unitId?.dateOfExam}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Journey Date </td>
                  <td className="text-center px-5">: </td>
                  <td>{bus?.departureDate}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Starting Point </td>
                  <td className="text-center px-5">: </td>
                  <td>{bus?.startingPoint}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Seats</td>
                  <td className="text-center px-5">: </td>
                  <td>{bookedSeats.join(",")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-white bg-teal-600 rounded-md p-2 flex items-center px-10 mr-10 gap-2 mt-5  text-lg font-semibold">
            Payment Details
          </h3>
          <div className="overflow-x-auto ml-4 my-2">
            {/* <p className="text-xl font-semibold  my-1">{bus?.tripName}</p> */}
            <table className="">
              {/* head */}
              <thead>
                <tr>
                  <td className="font-semibold">Per seat price </td>
                  <td className="text-center px-5">: </td>
                  <td>{bus?.seatPrice}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">Total Price</td>
                  <td className="text-center px-5">: </td>
                  <td>
                    {`${bus?.seatPrice} * ${bookedSeats?.length}`} ={" "}
                    {totalPrice}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Bkash Charge (2%)</td>
                  <td className="text-center px-5">: </td>
                  <td>{(Number(totalPrice) * 2) / 100}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total Payable Amount</td>
                  <td className="text-center px-5">: </td>
                  <td className="font-semibold">{totalPayableAmount} BDT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
