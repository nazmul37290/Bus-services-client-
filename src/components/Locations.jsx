/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SectionHeading from "./shared/SectionHeading";
import axios from "axios";
import BusRouteCard from "./BusRouteCard";
import Modal from "./Modal";

const Locations = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModalRoute, setActiveModalRoute] = useState();

  const setActiveRoute = (route) => {
    setActiveModalRoute(route);
    document.getElementById("my_modal_1").showModal();
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/bus-routes`)
      .then((result) => {
        setBusRoutes(result.data.data);
        setLoading(false);
      })
      .then((err) => {
        setError(err?.response?.data?.message);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <SectionHeading title={"Available Exams"}></SectionHeading>
      <div id="select-route" className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:gap-10 gap-5">
          {loading ? (
            <div className="flex flex-wrap justify-center gap-10">
              <div className="skeleton h-80 w-80"></div>
              <div className="skeleton h-80 w-80"></div>
              <div className="skeleton h-80 w-80"></div>
            </div>
          ) : (
            busRoutes?.map((route, index) => {
              return (
                <BusRouteCard
                  key={index}
                  setActiveRoute={setActiveRoute}
                  route={route}
                ></BusRouteCard>
              );
            })
          )}
        </div>
        <Modal route={activeModalRoute}></Modal>
      </div>
    </>
  );
};

export default Locations;
