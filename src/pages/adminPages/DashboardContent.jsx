import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import StatCard from "../../components/shared/StatCard";
import DetailedChart from "../../components/DetailedChart";

const DashboardContent = () => {
  const [statistics, setStatistics] = useState();
  const [timePeriod, setTimePeriod] = useState(null);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/bookings/get-revenue?timePeriod=${timePeriod}`
      )
      .then((res) => {
        setStatistics(res.data.data);
        console.log(res.data.data);
      });
  }, [timePeriod]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-teal-600 font-semibold mb-5 md:mb-0 text-2xl uppercase">
          Statistics
        </h3>
        <select
          onChange={(e) => setTimePeriod(e.target.value)}
          className="select select-bordered"
          name="timePeriodList"
          id="timePeriodList"
        >
          <option value={null}>Overall</option>
          <option value={1}>Today</option>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
        </select>
      </div>
      <StatCard stats={statistics}></StatCard>
      <h3 className="text-teal-600 font-semibold mt-10 mb-5  text-2xl uppercase">
        Detailed Chart
      </h3>
      <DetailedChart stats={statistics?.revenueByPaymentMethod}></DetailedChart>
    </div>
  );
};

export default DashboardContent;
