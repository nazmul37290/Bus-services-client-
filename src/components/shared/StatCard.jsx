import PropTypes from "prop-types";
import { FcApproval, FcCancel, FcMoneyTransfer } from "react-icons/fc";

const StatCard = ({ stats }) => {
  console.log(stats);
  return (
    <div>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative overflow-hidden flex items-center gap-5 rounded-lg bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <div className=" rounded-md text-white p-2">
            <FcApproval size={40} />
          </div>
          <div>
            <dt className="flex items-center">
              <p className=" truncate text-sm font-medium text-gray-500">
                {/* {item.name} */}
                Total Bookings
              </p>
            </dt>
            <dd className=" flex items-baseline">
              <p className="text-2xl font-semibold text-teal-800">
                {/* {item.stat} */}
                {stats?.totalRevenue[0]?.totalBookings}
              </p>
            </dd>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg flex items-center gap-5 bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <div className=" rounded-md text-white p-2">
            <FcCancel size={40} />
          </div>
          <div>
            <dt>
              <p className=" truncate text-sm font-medium text-gray-500">
                {/* {item.name} */}
                Cancellation
              </p>
            </dt>
            <dd className=" flex items-baseline ">
              <p className="text-2xl font-semibold text-teal-800">
                {stats?.cancelCount[0]?.cancelledCount || 0}
              </p>
            </dd>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg flex items-center gap-5 bg-teal-50 px-4 pb-5 pt-5 shadow sm:px-6 sm:pt-6">
          <div className=" rounded-md text-white p-2">
            <FcMoneyTransfer size={40} />
          </div>
          <div>
            <dt>
              <p className=" truncate text-sm font-medium text-gray-500">
                Total Revenue
              </p>
            </dt>
            <dd className=" flex items-baseline ">
              <p className="text-2xl font-semibold text-teal-800">
                {stats?.totalRevenue[0]?.totalRevenue} BDT
              </p>
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default StatCard;

StatCard.propTypes = {
  stats: PropTypes.object,
};
