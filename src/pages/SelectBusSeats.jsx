import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { generateSeatNumbers } from "../utils/generateSeats";
import { GiSteeringWheel } from "react-icons/gi";
import { PiEngineBold } from "react-icons/pi";
import { LuArrowRightLeft } from "react-icons/lu";

const SelectBusSeats = () => {
  const [bus, setBus] = useState();
  const [bookedSeats, setBookedSeats] = useState([]);
  console.log(bookedSeats);
  const { busId } = useParams();
  const seats = generateSeatNumbers(40);
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
    } else {
      alert("You can only book 6 seats");
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto">
      <p className="text-xl font-semibold my-5">{bus?.tripName}</p>
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
      <div className="border flex border-teal-600 mt-10">
        <div className="w-fit">
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
          <div className="grid grid-cols-4 gap-5 w-fit p-10 pt-6">
            {seats.map((seat, index) => {
              return (
                <div
                  key={index}
                  onClick={(e) => selectSeats(e, seat)}
                  className={`p-1 h-10 w-16 border border-teal-600 flex items-center  justify-center rounded-md ${
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
        <div className="w-1/3"></div>
      </div>
    </div>
  );
};

export default SelectBusSeats;
