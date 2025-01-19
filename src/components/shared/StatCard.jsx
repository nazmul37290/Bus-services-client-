import PropTypes from "prop-types";
import { TbCoinTaka } from "react-icons/tb";

const StatCard = ({ stats }) => {
  console.log(stats);
  return (
    <div>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-teal-600 text-white p-2">
              <TbCoinTaka size={30} />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {/* {item.name} */}
              Total Bookings
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-teal-800">
              {/* {item.stat} */}
              {stats?.totalRevenue[0]?.totalBookings}
            </p>
          </dd>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-teal-600 text-white p-2">
              <TbCoinTaka size={30} />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {/* {item.name} */}
              Cancellation
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-teal-800">
              {stats?.cancelCount[0]?.cancelledCount || 0}
            </p>
          </dd>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <dt>
            <div className="absolute rounded-md bg-teal-600 text-white p-2">
              <TbCoinTaka size={30} />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {/* {item.name} */}
              Total Revenue
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-teal-800">
              {/* {item.stat} */}
              {stats?.totalRevenue[0]?.totalRevenue} BDT
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default StatCard;

StatCard.propTypes = {
  stats: PropTypes.object,
};
