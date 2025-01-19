import PropTypes from "prop-types";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DetailedChart = ({ stats }) => {
  console.log(stats);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        height={400}
        width={1000}
        data={stats}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 6" />
        <XAxis dataKey="_id.date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type={"monotone"} dataKey="totalRevenue" fill="#8884d8" />
        <Area type={"monotone"} dataKey="totalBookings" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DetailedChart;

DetailedChart.propTypes = {
  stats: PropTypes.array.isRequired,
};
