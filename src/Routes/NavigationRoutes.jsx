import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router";
import Tickets from "../pages/Tickets";
import BusLists from "../pages/BusLists";
import SelectBusSeats from "../pages/SelectBusSeats";
import CheckOutPage from "../pages/CheckOutPage";
import Dashboard from "../pages/adminPages/Dashboard";
import BusRoutes from "../pages/adminPages/BusRoutes";
import DashboardContent from "../pages/adminPages/DashboardContent";
import Units from "../pages/adminPages/Units";
import Buses from "../pages/adminPages/Buses";
import Bookings from "../pages/adminPages/Bookings";
import Users from "../pages/adminPages/Users";
import CreateUser from "../pages/adminPages/CreateUser";
import UpdateUser from "../pages/adminPages/UpdateUser";
import CreateRoute from "../pages/adminPages/CreateRoute";
import UpdateRoute from "../pages/adminPages/UpdateRoute";
import CreateUnit from "../pages/adminPages/CreateUnit";
import UpdateUnit from "../pages/adminPages/UpdateUnit";
import CreateBus from "../pages/adminPages/CreateBus";
import UpdateBus from "../pages/adminPages/UpdateBus";
import Error from "../pages/Error";
// import Login from "../pages/auth/Login";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/auth/Login";
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
        <Route path="*" element={<Error></Error>} />
      </Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route
        path="/admin"
        element={
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        }
      >
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
