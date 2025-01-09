import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { generateSeatNumbers } from "../utils/generateSeats";
import { GiSteeringWheel } from "react-icons/gi";
import { PiEngineBold } from "react-icons/pi";
import { LuArrowRightLeft } from "react-icons/lu";
import { toast } from "react-toastify";

const SelectBusSeats = () => {
  const [bus, setBus] = useState();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { busId } = useParams();
  const seats = generateSeatNumbers(Number(bus?.totalSeats));
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/buses/${busId}`)
      .then((res) => setBus(res?.data?.data));
  }, [busId]);

  const selectSeats = (e, seat) => {
    const seatNumber = e.target;
    if (bookedSeats.length < 6) {
      if (bookedSeats.includes(seat)) {
        seatNumber.classList.remove("bg-teal-600");
        seatNumber.classList.add("bg-white");
        const index = bookedSeats.indexOf(seat);
        setBookedSeats([
          ...bookedSeats.slice(0, index),
          ...bookedSeats.slice(index + 1),
        ]);
        return;
      }
      seatNumber.classList.add("bg-teal-600");
      seatNumber.classList.remove("bg-white");
      setBookedSeats([...bookedSeats, seat]);
      setTotalPrice(totalPrice + bus?.seatPrice);
    } else {
      toast.error("Cannot select more than 6 seats");
    }
  };
  const navigate = useNavigate();
  const handleCheckOut = () => {
    console.log(bus.id);
    navigate("/checkout-page", {
      state: { totalPrice, bookedSeats, busId: bus?.id, id: bus._id },
    });
  };

  return (
    <div className="max-w-screen-xl min-h-[calc(100vh-380px)] mx-auto">
      <div className="px-10">
        <p className="text-2xl font-semibold my-4 text-teal-600 ">
          {bus?.tripName}
        </p>
        <p className="text-lg font-semibold my-1">
          Bus name: <span className="font-normal">{bus?.busName}</span>
        </p>
        <p className="text-lg font-semibold my-1">
          Departure Date:{" "}
          <span className="font-normal">{bus?.departureDate}</span>
        </p>
        <p className="text-lg font-semibold my-1">
          Ticket Price: {bus?.seatPrice}
          <span className="font-normal">/- Per seat</span>
        </p>
      </div>
      <div className="border flex flex-col md:flex-row justify-center gap-5 lg:gap-10 rounded border-teal-600 mt-10">
        <div className="max-w-80 md:max-w-full lg:w-fit mx-auto px-5">
          <div className="pt-8 flex justify-between px-10">
            <span>
              <LuArrowRightLeft size={40} />
            </span>
            <span>
              <PiEngineBold size={40} />
            </span>
            <span>
              <GiSteeringWheel size={45} />
            </span>
          </div>
          <div className="grid grid-cols-4 gap-5 max-w-80 md:max-w-full  lg:w-fit md:p-10 pt-6">
            {seats.map((seat, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => selectSeats(e, seat)}
                  className={`p-1 md:h-10 w-14 md:w-16 border border-teal-600 flex items-center  justify-center rounded-md ${
                    bus?.bookedSeats.includes(seat)
                      ? "bg-zinc-400 cursor-not-allowed pointer-events-none"
                      : "bg-white"
                  } font-semibold `}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        </div>
        <div className="md:w-2/5 lg:w-2/3 flex flex-col px-2">
          <h3 className="text-white bg-teal-600 rounded-md p-2 flex items-center justify-center gap-2 text-center mt-8 text-lg font-semibold">
            Selected Seats <span>{bookedSeats?.length}</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Serial no</th>
                  <th>Seat </th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookedSeats?.map((bookedSeat, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold">{bookedSeat}</td>
                      <td className="font-semibold">{bus?.seatPrice}</td>
                    </tr>
                  );
                })}
                {bookedSeats?.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      No seats selected
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td></td>
                    <td className="font-bold">Total Price</td>
                    <td className="font-bold">{totalPrice}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <button
              onClick={handleCheckOut}
              disabled={bookedSeats?.length === 0}
              className="btn bg-teal-100 text-base disabled:bg-gray-300 my-10  uppercase text-teal-900 w-full"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBusSeats;
