import PropTypes from "prop-types";
const SectionHeading = ({ title }) => {
  return (
    <div>
      <h3 className="my-10 max-w-fit mx-auto p-5 border-b-2 border-teal-700  text-xl font-bold text-teal-700 uppercase">
        {title}
      </h3>
    </div>
  );
};

export default SectionHeading;

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
