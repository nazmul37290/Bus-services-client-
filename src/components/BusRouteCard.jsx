import PropTypes from "prop-types";
import { IoLocationOutline } from "react-icons/io5";
const BusRouteCard = ({ route, setActiveRoute }) => {
  return (
    <div className="card card-compact   sm:w-72 md:w-80 lg:w-96 shadow-xl">
      <figure className="h-52  overflow-hidden">
        <img
          src={
            (route?.destinationImage && `${route?.destinationImage}`) ||
            "/assets/ru.png"
          }
          className="w-full  object-cover h-full"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold">{route?.examName}</h2>
        <p className="flex items-center gap-2 text-base text-teal-700 font-semibold">
          <span>
            <IoLocationOutline></IoLocationOutline>
          </span>{" "}
          {route?.examCenterName}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => setActiveRoute(route)}
            className="btn text-white border-none bg-gradient-to-tr from-teal-600 to-teal-400"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusRouteCard;

BusRouteCard.propTypes = {
  route: PropTypes.object,
  examName: PropTypes.string,
  setActiveRoute: PropTypes.func,
};
