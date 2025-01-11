/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../../utils/formatDate";
import axios from "axios";
import { toast } from "react-toastify";
import { formatShowDate } from "../../utils/formatShowDate";

const UpdateBus = () => {
  const { id } = useParams();
  const [bus, setBus] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [routeId, setRouteId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(bus?.status);
  const [selectedBusType, setSelectedBusType] = useState();
  const [routes, setRoutes] = useState([]);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/buses/${id}`)
      .then((res) => {
        setLoading(false);
        setBus(res.data.data);
        setRouteId(bus?.routeId);
        setUnitId(bus?.unitId?._id);
        setSelectedStatus(bus?.status);
        setSelectedBusType(bus?.busType);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.errorSources[0]?.message);
      });
  }, [id, bus?.status, bus?.routeId, bus?.busType]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes`)
      .then((result) => {
        setRoutes(result.data.data);
      })
      .catch((err) => setError(err?.response?.data?.errorSources[0]?.message));
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/units?route=${routeId}`)
      .then((result) => {
        setUnits(result.data.data);
      })
      .catch((err) => setError(err.message));
  }, [routeId]);
  const handleUpdateBus = (e) => {
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
    const endingPoint = form.startingPoint.value;
    const seatPrice = Number(form.seatPrice.value);
    const departureDate = formatDate(form.departureDate.value);
    const departureTime = form.departureTime.value;
    const returnDate = formatDate(form.returnDate.value);
    const returnTime = form.returnTime.value;
    const status = form.status.value;

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
      status,
    };

    axios
      .patch(`${import.meta.env.VITE_BASE_URL}/buses/${id}`, busDetails)
      .then((res) => {
        toast.success("Bus updated successfully");
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
        Update Bus
      </h3>
      <form onSubmit={handleUpdateBus} className="mt-5 ">
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
                defaultValue={bus?.busName}
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
                onChange={(e) => setSelectedBusType(e.target.value)}
                value={selectedBusType}
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
              defaultValue={bus?.tripName}
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
              defaultValue={bus?.totalSeats}
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
                value={routeId}
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
                onChange={(e) => setUnitId(e.target.value)}
                name="unitId"
                className="select select-bordered w-[500px] "
                id="unitId"
                value={unitId}
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
              defaultValue={bus?.startingPoint}
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
              defaultValue={bus?.endingPoint}
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
              defaultValue={bus?.seatPrice}
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
              defaultValue={formatShowDate(bus?.departureDate)}
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
              defaultValue={bus?.departureTime}
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
              defaultValue={formatShowDate(bus?.returnDate)}
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
              defaultValue={bus?.returnTime}
              placeholder="Enter departure time..."
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="status"
            >
              STATUS
            </label>
            <div>
              <select
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                }}
                name="status"
                className="select select-bordered w-[500px] "
                id="status"
                value={selectedStatus}
              >
                <option value="active">Active</option>
                <option value="disable">Disable</option>
              </select>
            </div>
          </div>
          <p className="text-red-600 ">{error}</p>
          <button className="btn bg-teal-600 text-white mt-14">
            {loading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBus;
