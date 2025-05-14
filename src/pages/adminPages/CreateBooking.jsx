import axios from "axios";
import { useEffect, useState } from "react";
import { generateSeatNumbers } from "../../utils/generateSeats";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateBooking = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [error, setError] = useState("");
  const [routes, setRoutes] = useState([]);
  const [units, setUnits] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [selectedBusId, setSelectedBusId] = useState("");

  const selectedBus = buses.find((bus) => bus._id === selectedBusId);
  const seats = generateSeatNumbers(selectedBus?.totalSeats);

  const selectSeats = (e, seat) => {
    const seatNumber = e.target;
    if (bookedSeats.includes(seat)) {
      seatNumber.classList.remove("bg-teal-600");
      seatNumber.classList.add("bg-white");
      const index = bookedSeats.indexOf(seat);
      setBookedSeats([
        ...bookedSeats.slice(0, index),
        ...bookedSeats.slice(index + 1),
      ]);
      setTotalPrice(totalPrice - selectedBus?.seatPrice);
      return;
    }
    if (bookedSeats.length < 6) {
      seatNumber.classList.add("bg-teal-600");
      seatNumber.classList.remove("bg-white");
      setBookedSeats([...bookedSeats, seat]);
      setTotalPrice(totalPrice + selectedBus?.seatPrice);
    } else {
      toast.error("Cannot select more than 6 seats");
    }
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/bus-routes`).then((result) => {
      setRoutes(result.data.data);
    });
  }, []);
  useEffect(() => {
    selectedRouteId &&
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/units?route=${selectedRouteId}`)
        .then((result) => {
          setUnits(result.data.data);
        })
        .catch((err) => setError(err.message));
  }, [selectedRouteId]);
  useEffect(() => {
    selectedUnitId &&
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/buses?unit=${selectedUnitId}`)
        .then((res) => {
          setBuses(res?.data?.data);
        })
        .catch((err) => {
          setBuses([]);
          setError(err?.response?.data?.message);
        });
  }, [selectedUnitId]);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const contactNumber = form.contactNumber.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const due = Number(form.due.value);
    const busId = selectedBusId;
    const seats = bookedSeats;
    if (!seats.length) {
      toast.error("Please select at least one seat");
      setLoading(false);
      return;
    }
    let payableAmount;
    if (paymentMethod === "bkash") {
      payableAmount = totalPrice + (totalPrice * 2) / 100;
    } else {
      payableAmount = totalPrice;
    }
    const transactionId = form?.transactionId?.value || "";
    const bookingData = {
      name,
      contactNumber,
      email,
      gender,
      busId,
      seats,
      totalPrice: payableAmount,
      transactionId,
      due,
      paymentMethod,
      paidAmount,
    };
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/bookings/create-booking`,
        bookingData
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Booking created successfully");
          setLoading(false);
          setBookedSeats([]);
          form.reset();
          navigate("/admin/bookings");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold text-teal-600 uppercase">
        Create Booking
      </h3>
      <form onSubmit={handleCreateBooking} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="name"
            >
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="name"
              id="name"
              placeholder="Enter passenger name... "
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="contactNumber"
            >
              Contact Number: <span className="text-red-500">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="contactNumber"
              id="contactNumber"
              required
              placeholder="Enter contact number here"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address here"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="gender"
            >
              Gender: <span className="text-red-500">*</span>
            </label>
            <select
              className="select select-bordered w-[500px]"
              name="gender"
              id="gender"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="paymentMethod"
            >
              Payment Method: <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setError("");
              }}
              className="select select-bordered w-[500px]"
              name="paymentMethod"
              id="paymentMethod"
            >
              <option value="cash">Cash</option>
              <option value="bkash">Bkash</option>
            </select>
          </div>
          {paymentMethod != "cash" && (
            <div className="flex flex-wrap items-center mt-4">
              <label
                className=" flex-1 text-base font-semibold uppercase"
                htmlFor="transactionId"
              >
                Transaction ID: <span className="text-red-500">*</span>
              </label>
              <input
                className="input input-bordered px-2 w-[500px]"
                type="text"
                name="transactionId"
                id="transactionId"
                placeholder="Enter transaction id... "
                required
              />
            </div>
          )}
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="routeId"
            >
              Select Route <span className="text-red-500">*</span>
            </label>
            <div>
              <select
                onChange={(e) => {
                  setSelectedRouteId(e.target.value);
                  setError("");
                }}
                name="routeId"
                className="select select-bordered w-full  sm:w-[500px]"
                id="routeId"
              >
                <option value="">Select a route</option>
                {routes?.map((route, index) => {
                  return (
                    <option key={index} value={route?._id}>
                      {`${route?.examName}  ( ${route?.examCenterName} )`}
                    </option>
                  );
                })}
              </select>
              <p className="mt-1 text-sm sm:text-base text-blue-500">
                This route refers to exam name and exam location
              </p>
            </div>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row sm:items-center w-full mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="image"
            >
              Select Unit <span className="text-red-600">*</span>
            </label>
            <div>
              <select
                onChange={(e) => {
                  setSelectedUnitId(e.target.value);
                  setError("");
                }}
                name="unitId"
                className="select select-bordered w-full sm:w-[500px]"
                id="unitId"
              >
                <option value="">Select a unit</option>
                {units?.map((unit, index) => {
                  return (
                    <option key={index} value={unit?.id}>
                      {`${unit?.groupName}`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row sm:items-center w-full mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="busId"
            >
              Select Bus <span className="text-red-600">*</span>
            </label>
            <div>
              <select
                onChange={(e) => setSelectedBusId(e.target.value)}
                name="busId"
                className="select select-bordered w-full sm:w-[500px]"
                id="busId"
              >
                <option value="">Select a bus</option>
                {buses?.map((bus, index) => {
                  return (
                    <option key={index} value={bus?._id}>
                      {`${bus?.busName}  ( ${bus?.startingPoint} )`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap flex-col sm:flex-row sm:items-center w-full mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="busId"
            >
              Select Seats <span className="text-red-600">*</span>
            </label>
            <div className="grid grid-cols-4 gap-4 mt-5 sm:mt-0">
              {seats &&
                seats?.map((seat, index) => {
                  return (
                    <div
                      onClick={(e) => selectSeats(e, seat)}
                      className={`border-teal-600  border rounded-lg px-4 flex items-center justify-center ${
                        selectedBus?.bookedSeats.includes(seat)
                          ? "bg-zinc-400 cursor-not-allowed pointer-events-none"
                          : "bg-white"
                      } py-1`}
                      key={index}
                    >
                      {seat}
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="totalPrice"
            >
              Total Price:
            </label>
            <input
              readOnly
              onChange={(e) => setTotalPrice(Number(e.target.value))}
              className="input input-bordered px-2 w-[500px] appearance-none m-0"
              type="number"
              name="totalPrice"
              id="totalPrice"
              value={
                paymentMethod === "cash"
                  ? totalPrice
                  : totalPrice + (Number(totalPrice) * 2) / 100
              }
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="paidAmount"
            >
              Paid
            </label>
            <input
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="input input-bordered px-2 w-[500px] appearance-none m-0"
              type="number"
              name="paidAmount"
              id="paidAmount"
              value={paidAmount}
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="due"
            >
              Due
            </label>
            <input
              readOnly
              className="input input-bordered px-2 w-[500px] appearance-none m-0"
              type="number"
              name="due"
              id="due"
              value={totalPrice - paidAmount}
            />
          </div>
          <p className="text-red-600 ">{error}</p>
          <button className="btn bg-teal-600 text-white mt-14">
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Book"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBooking;
