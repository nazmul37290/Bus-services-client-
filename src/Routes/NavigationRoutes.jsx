import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router";
import Tickets from "../pages/Tickets";
import BusLists from "../pages/BusLists";
import SelectBusSeats from "../pages/SelectBusSeats";
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
        <Route path="/tickets" element={<Tickets></Tickets>}></Route>
      </Route>
    </Routes>
  );
};

export default NavigationRoutes;
