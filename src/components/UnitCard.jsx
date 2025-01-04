import PropTypes from "prop-types";
import { BsCalendarDate } from "react-icons/bs";

const UnitCard = ({ unit }) => {
  return (
    <div className="p-5 text-center bg-teal-800 text-white h-28 w-56 rounded-lg">
      <h4 className="font-bold text-lg">{unit?.groupName}</h4>
      <p className="flex items-center justify-center mt-2 gap-2">
        <BsCalendarDate></BsCalendarDate>

        {unit?.dateOfExam}
      </p>
    </div>
  );
};

export default UnitCard;

UnitCard.propTypes = {
  unit: PropTypes.shape({
    groupName: PropTypes.string.isRequired,
    dateOfExam: PropTypes.string.isRequired,
  }),
};
