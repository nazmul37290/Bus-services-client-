import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BusCard from "../components/BusCard";

const BusLists = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/buses?unit=${id}`)
      .then((res) => {
        setBuses(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);

        setLoading(false);
      });
  }, [id, error]);
  return (
    <div className="max-w-screen-xl min-h-[calc(100vh-380px)] mx-auto">
      {loading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : error ? (
        <h3 className="text-red-600 mt-5 font-semibold text-2xl text-center">
          {error}
        </h3>
      ) : (
        <h3 className="p-4 text-2xl font-semibold">
          Available Buses for
          <span className="text-teal-800 ml-2 font-bold">
            {buses[0]?.routeDetails?.examName} (
            {buses[0]?.unitDetails?.groupName})
          </span>
        </h3>
      )}
      {/* buses container  */}
      <div className="flex flex-col gap-5">
        {buses?.map((bus, index) => {
          return <BusCard key={index} bus={bus}></BusCard>;
        })}
      </div>
    </div>
  );
};

export default BusLists;
