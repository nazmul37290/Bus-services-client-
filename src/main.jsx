import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router";
import NavigationRoutes from "./Routes/NavigationRoutes.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <NavigationRoutes></NavigationRoutes>
    </BrowserRouter>
  </StrictMode>
);
