import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateRoute = () => {
  const [busRoute, setBusRoute] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(busRoute?.status);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes/${id}`)
      .then((res) => {
        setLoading(false);
        setBusRoute(res.data.data);
        setSelectedStatus(busRoute?.status);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Error fetching route details");
      });
  }, [id, busRoute?.status]);
  const handleUpdateRoute = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const examName = form.examName.value;
    const examCenterName = form.examCenter.value;
    const destinationImage = form.image.value;
    const status = form.status.value;

    const routeDetails = {
      examName,
      examCenterName,
      destinationImage,
      status,
    };
    axios
      .patch(`${import.meta.env.VITE_BASE_URL}/bus-routes/${id}`, routeDetails)
      .then((res) => {
        toast.success("Route updated successfully");
        navigate("/admin/bus-routes");
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
        Update Route
      </h3>
      <form onSubmit={handleUpdateRoute} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examName"
            >
              Exam Name
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              defaultValue={busRoute?.examName}
              name="examName"
              id="examName"
              placeholder="Enter exam name... (ex. RU Admission, BUET Admission)"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examCenter"
            >
              Exam center location
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              defaultValue={busRoute?.examCenterName}
              name="examCenter"
              id="examCenter"
              placeholder="(ex. Rajshahi University, Chattogram University)"
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="file-input file-input-bordered w-[500px]"
              defaultValue={busRoute?.destinationImage}
              type="file"
              name="image"
              id="image"
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

export default UpdateRoute;
