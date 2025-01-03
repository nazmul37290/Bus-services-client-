import { useEffect, useState } from "react";
import SectionHeading from "./shared/SectionHeading";
import axios from "axios";
import BusRouteCard from "./BusRouteCard";
import Modal from "./Modal";

const Locations = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [activeModalRoute, setActiveModalRoute] = useState();

  const setActiveRoute = (route) => {
    setActiveModalRoute(route);
    document.getElementById("my_modal_1").showModal();
    console.log(route);
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/bus-routes`).then((result) => {
      setBusRoutes(result.data.data);
    });
  }, []);
  return (
    <>
      <SectionHeading title={"Available Exams"}></SectionHeading>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex gap-10">
          {busRoutes.map((route, index) => {
            return (
              <BusRouteCard
                key={index}
                setActiveRoute={setActiveRoute}
                route={route}
              ></BusRouteCard>
            );
          })}
        </div>
        <Modal route={activeModalRoute}></Modal>
      </div>
    </>
  );
};

export default Locations;
