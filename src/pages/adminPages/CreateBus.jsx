/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatDate";

const CreateBus = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [routeId, setRouteId] = useState("");
  const [routes, setRoutes] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes`)
      .then((result) => {
        setRoutes(result.data.data);
      })
      .catch((err) => setError(err.message));
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/units?route=${routeId}`)
      .then((result) => {
        setUnits(result.data.data);
      })
      .catch((err) => setError(err.message));
  }, [routeId]);
  const handleCreateBus = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const busName = form.busName.value;
    const busType = form.busType.value;
    const tripName = form.tripName.value;
    const totalSeats = Number(form.totalSeats.value);
    const routeId = form.routeId.value;
    const unitId = form.unitId.value;
    const startingPoint = form.startingPoint.value;
    const endingPoint = form.endingPoint.value;
    const seatPrice = Number(form.seatPrice.value);
    const departureDate = formatDate(form.departureDate.value);
    const departureTime = form.departureTime.value;
    const returnDate = formatDate(form.returnDate.value);
    const returnTime = form.returnTime.value;

    const busDetails = {
      busType,
      busName,
      tripName,
      totalSeats,
      routeId,
      unitId,
      startingPoint,
      endingPoint,
      seatPrice,
      departureDate,
      departureTime,
      returnDate,
      returnTime,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/buses/create-bus`, busDetails)
      .then((res) => {
        toast.success("Bus created successfully");
        navigate("/admin/buses");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.errorSources[0].message);
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold text-teal-600 uppercase">
        Create Bus
      </h3>
      <form onSubmit={handleCreateBus} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="busName"
            >
              Bus Name <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                className="input input-bordered px-2 w-[500px]"
                type="text"
                name="busName"
                id="busName"
                placeholder="Enter bus name... (ex. BUS-3-CU-C,BUS-5-RU-C)"
                required
              />
              <p className="mt-1 text-sm text-blue-500">
                Expected format:{" "}
                <span className="font-semibold">
                  Bus-Bus no-uni shorthand-unit
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="busType"
            >
              Bus Type <span className="text-red-600">*</span>
            </label>
            <div>
              <select
                name="busType"
                className="select select-bordered w-[500px] "
                id="busType"
              >
                <option value="Non-AC">Non AC</option>
                <option value="AC">AC</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="tripName"
            >
              Trip Name <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="tripName"
              id="tripName"
              placeholder="ex. Bogura to Dhaka University (DU Admission)"
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="totalSeats"
            >
              Total Seats <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="number"
              name="totalSeats"
              id="totalSeats"
              placeholder="Enter total seats"
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="routeId"
            >
              Select Route <span className="text-red-600">*</span>
            </label>
            <div>
              <select
                onChange={(e) => setRouteId(e.target.value)}
                name="routeId"
                className="select select-bordered w-[500px] "
                id="routeId"
              >
                {routes?.map((route, index) => {
                  return (
                    <option key={index} value={route?._id}>
                      {`${route?.examName}  ( ${route?.examCenterName} )`}
                    </option>
                  );
                })}
              </select>
              <p className="mt-1 text-sm text-blue-500">
                This route refers to exam name and exam location
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="image"
            >
              Select Unit <span className="text-red-600">*</span>
            </label>
            <div>
              <select
                name="unitId"
                className="select select-bordered w-[500px] "
                id="unitId"
              >
                {units?.map((unit, index) => {
                  return (
                    <option key={index} value={unit?._id}>
                      {`${unit?.routeDetails?.examName}  ( ${unit?.routeDetails?.examCenterName} ) ( ${unit?.groupName} )`}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="startingPoint"
            >
              Starting Point <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="startingPoint"
              id="startingPoint"
              placeholder="Enter starting point..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="endingPoint"
            >
              Ending Point <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="endingPoint"
              id="endingPoint"
              placeholder="Enter ending point..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="seatPrice"
            >
              Seat Price <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="number"
              name="seatPrice"
              id="seatPrice"
              placeholder="Enter seat price..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="departureDate"
            >
              Departure Date <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="date"
              name="departureDate"
              id="departureDate"
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="departureTime"
            >
              Departure Time <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="departureTime"
              id="departureTime"
              placeholder="Enter departure time..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="returnDate"
            >
              Return Date <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="date"
              name="returnDate"
              id="returnDate"
              required
            />
          </div>

          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="returnTime"
            >
              Return Time <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="returnTime"
              id="returnTime"
              placeholder="Enter departure time..."
              required
            />
          </div>
          <p className="text-red-600 ">{error}</p>
          <button className="btn bg-teal-600 text-white mt-14">
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBus;
