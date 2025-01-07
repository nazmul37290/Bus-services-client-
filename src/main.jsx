import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router";
import NavigationRoutes from "./Routes/NavigationRoutes.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <NavigationRoutes></NavigationRoutes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
