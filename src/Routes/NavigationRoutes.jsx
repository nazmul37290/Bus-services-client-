import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router";
import Tickets from "../pages/Tickets";
import BusLists from "../pages/BusLists";
import SelectBusSeats from "../pages/SelectBusSeats";
import CheckOutPage from "../pages/CheckOutPage";
import Dashboard from "../pages/admin pages/Dashboard";
import BusRoutes from "../pages/admin pages/BusRoutes";
import DashboardContent from "../pages/admin pages/DashboardContent";
const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/bus-lists/:id" element={<BusLists></BusLists>}></Route>
        <Route
          path="/select-seats/:busId"
          element={<SelectBusSeats></SelectBusSeats>}
        ></Route>
        <Route
          path="/checkout-page"
          element={<CheckOutPage></CheckOutPage>}
        ></Route>
        <Route path="/tickets" element={<Tickets></Tickets>}></Route>
      </Route>
      <Route path="/admin" element={<Dashboard></Dashboard>}>
        <Route index element={<DashboardContent></DashboardContent>}></Route>
        <Route path="bus-routes" element={<BusRoutes></BusRoutes>}></Route>
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
