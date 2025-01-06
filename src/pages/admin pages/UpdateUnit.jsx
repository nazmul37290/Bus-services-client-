import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateUnit = () => {
  const [unit, setUnit] = useState();
  const [busRoutes, setBusRoutes] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(unit?.status);
  const [selectedRoute, setSelectedRoute] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes`)
      .then((result) => {
        setBusRoutes(result.data.data);
      })
      .catch((err) => setError(err?.response?.data?.errorSources[0]?.message));
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/units/${id}`)
      .then((res) => {
        setLoading(false);
        setUnit(res.data.data);
        setSelectedStatus(unit?.status);
        setSelectedRoute(unit?.routeId?._id);
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.errorSources[0]?.message);
      });
  }, [id, unit?.status, unit?.routeId._id]);
  const formatShowDate = (date) => {
    if (!date) {
      return "";
    }
    const [day, month, year] = date.split("-");
    const showableDate = `${year}-${month}-${day}`;
    return showableDate;
  };
  const handleUpdateUnit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const groupName = form.unitName.value;
    const routeId = form.routeId.value;
    const date = form.examDate.value;
    let dateOfExam = unit?.dateOfExam;
    if (date) {
      const [year, month, day] = date.split("-");
      dateOfExam = `${day}-${month}-${year}`;
    }
    const status = form.status.value;
    const unitDetails = {
      groupName,
      dateOfExam,
      routeId,
      status,
    };
    axios
      .patch(`${import.meta.env.VITE_BASE_URL}/units/${id}`, unitDetails)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Unit updated successfully");
          navigate("/admin/units");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err?.response?.data?.errorSources[0].message);
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold text-teal-600 uppercase">
        Update Unit
      </h3>
      <form onSubmit={handleUpdateUnit} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="unitName"
            >
              Unit Name
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="unitName"
              id="unitName"
              defaultValue={unit?.groupName}
              placeholder="Enter unit name... (ex. unit A , Faculty of Engineering)"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examDate"
            >
              Exam Date
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="date"
              defaultValue={formatShowDate(unit?.dateOfExam)}
              name="examDate"
              id="examDate"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="image"
            >
              Select Route
            </label>
            <div>
              <select
                onChange={(e) => {
                  setSelectedRoute(e.target.value);
                }}
                value={selectedRoute}
                name="routeId"
                className="select select-bordered w-[500px] "
                id="routeId"
              >
                {busRoutes?.map((route, index) => {
                  return (
                    <option key={index} value={route?._id}>
                      {`${route?.examName}  ( ${route?.examCenterName} )`}
                    </option>
                  );
                })}
              </select>
              <p className="mt-1 text-blue-500">
                This route refers to exam name and exam location
              </p>
            </div>
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

export default UpdateUnit;
