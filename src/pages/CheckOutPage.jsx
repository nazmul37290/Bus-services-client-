import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const CheckOutPage = () => {
  const [bus, setBus] = useState();
  const navigate = useNavigate();

  const { totalPrice, bookedSeats, busId, id } = useLocation().state;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/buses/${busId}`)
      .then((res) => setBus(res.data.data));
  }, [busId]);
  let totalPayableAmount = Number(totalPrice) + (Number(totalPrice) * 2) / 100;
  console.log(totalPrice, bookedSeats, busId);
  const handleData = async (e) => {
    e.preventDefault();
    const form = e.target;
    let details = {};
    details.name = form.name.value;
    details.contactNumber = form.contactNumber.value;
    details.email = form.email.value;
    details.gender = form.gender.value;
    details.busId = id;
    details.seats = bookedSeats;
    details.totalPrice = totalPayableAmount;
    details.transactionId = "7134514fsfs41tt5";
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/bookings/create-booking`, details)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          Swal.fire({
            title: "Seats booked successfully",
            text: `copy the pnr number ( ${res?.data?.data[0]?.pnrNumber} ) and get ticket from "get ticket section" `,
            icon: "success",
          });
          navigate("/tickets");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Cannot book seat",
          text: `${err.message}`,
          icon: "error",
        });
        navigate("/");
      });
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between mt-4 bg-teal-50">
        <form onSubmit={handleData} className=" w-1/2 p-10">
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
          <button
            type="submit"
            className="btn btn-lg mt-10 bg-white text-teal-600"
          >
            Pay with Bkash
            <img src="/assets/bkash.png" className="w-14" alt="bkash-logo" />
          </button>
        </form>
        <div className="w-1/2 mt-4">
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
