/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateRoute = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCreateRoute = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const examName = form.examName.value;
    const examCenterName = form.examCenter.value;
    const destinationImage = form.image.value;

    const routeDetails = {
      examName,
      examCenterName,
      destinationImage,
    };
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/bus-routes/create-bus-route`,
        routeDetails
      )
      .then((res) => {
        toast.success("Route created successfully");
        navigate("/admin/bus-routes");
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
        Create Route
      </h3>
      <form onSubmit={handleCreateRoute} className="mt-5 ">
        <div className="md:w-[700px]">
          <div className="flex flex-wrap items-center">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examName"
            >
              Exam Name <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="examName"
              id="examName"
              placeholder="Enter exam name... (ex. RU Admission, BUET Admission)"
              required
            />
          </div>
          <div className="flex flex-wrap items-center mt-4">
            <label
              className=" flex-1 text-base font-semibold uppercase"
              htmlFor="examCenter"
            >
              Exam center location <span className="text-red-600">*</span>
            </label>
            <input
              className="input input-bordered px-2 w-[500px]"
              type="text"
              name="examCenter"
              id="examCenter"
              placeholder="(ex. Rajshahi University, Chattogram University)"
              required
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
              type="file"
              name="image"
              id="image"
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

export default CreateRoute;
