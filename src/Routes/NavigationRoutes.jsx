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
import Units from "../pages/admin pages/Units";
import Buses from "../pages/admin pages/Buses";
import Bookings from "../pages/admin pages/Bookings";
import Users from "../pages/admin pages/Users";
import CreateUser from "../pages/admin pages/CreateUser";
import UpdateUser from "../pages/admin pages/UpdateUser";
import CreateRoute from "../pages/admin pages/CreateRoute";
import UpdateRoute from "../pages/admin pages/UpdateRoute";
import CreateUnit from "../pages/admin pages/CreateUnit";
import UpdateUnit from "../pages/admin pages/UpdateUnit";
import CreateBus from "../pages/admin pages/CreateBus";
import UpdateBus from "../pages/admin pages/UpdateBus";
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
        <Route path="units" element={<Units></Units>}></Route>
        <Route path="buses" element={<Buses></Buses>}></Route>
        <Route path="bookings" element={<Bookings></Bookings>}></Route>
        <Route path="users" element={<Users></Users>}></Route>
        <Route
          path="users/create-user"
          element={<CreateUser></CreateUser>}
        ></Route>
        <Route
          path="users/:id/update-user"
          element={<UpdateUser></UpdateUser>}
        ></Route>
        <Route
          path="bus-routes/create-route"
          element={<CreateRoute></CreateRoute>}
        ></Route>
        <Route
          path="bus-routes/:id/update-route"
          element={<UpdateRoute></UpdateRoute>}
        ></Route>
        <Route
          path="units/create-unit"
          element={<CreateUnit></CreateUnit>}
        ></Route>
        <Route
          path="units/:id/update-unit"
          element={<UpdateUnit></UpdateUnit>}
        ></Route>
        <Route
          path="buses/create-bus"
          element={<CreateBus></CreateBus>}
        ></Route>
        <Route
          path="buses/:id/update-bus"
          element={<UpdateBus></UpdateBus>}
        ></Route>
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
