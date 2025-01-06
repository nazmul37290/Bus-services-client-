import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import UnitCard from "./UnitCard";
const Modal = ({ route }) => {
  const [units, setUnits] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/units?route=${route?._id || 1}`)
      .then((result) => {
        if (result.data.success === true) {
          setUnits(result.data.data);
          setLoading(false);
          setError("");
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setUnits(null);
        setLoading(false);
      });
  }, [route?._id, route]);

  return (
    <div>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box max-w-4xl">
          <h3 className="font-bold text-2xl mb-4">{route?.examName}</h3>
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            <div className="flex flex-wrap gap-10">
              {units &&
                units.map((unit, index) => {
                  return (
                    <Link to={`/bus-lists/${unit?.id}`} key={index}>
                      <UnitCard unit={unit}></UnitCard>
                    </Link>
                  );
                })}
            </div>
          )}
          {!loading && <p className="py-4 text-red-600">{error}</p>}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  route: PropTypes.shape({
    _id: PropTypes.string,
    examName: PropTypes.string,
  }),
};
