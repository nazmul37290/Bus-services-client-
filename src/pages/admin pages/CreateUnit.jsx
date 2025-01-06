import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateUnit = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes`)
      .then((result) => {
        setRoutes(result.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleCreateUnit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const groupName = form.unitName.value;
    const routeId = form.routeId.value;
    const date = form.examDate.value;
    const [year, month, day] = date.split("-");
    const dateOfExam = `${day}-${month}-${year}`;
    const unitDetails = {
      groupName,
      dateOfExam,
      routeId,
    };
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/units/create-unit`, unitDetails)
      .then((res) => {
        toast.success("Unit created successfully");
        navigate("/admin/units");
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err?.response?.data?.errorSources[0].message);
      });
  };
  return (
    <div>
      <h3 className="text-2xl font-semibold text-teal-600 uppercase">
        Create Unit
      </h3>
      <form onSubmit={handleCreateUnit} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="unitName"
            >
              Unit Name <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="unitName"
              id="unitName"
              placeholder="Enter unit name... (ex. unit A , Faculty of Engineering)"
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examDate"
            >
              Exam Date <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="date"
              name="examDate"
              id="examDate"
              required
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
              <p className="mt-1 text-blue-500">
                This route refers to exam name and exam location
              </p>
            </div>
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

export default CreateUnit;
