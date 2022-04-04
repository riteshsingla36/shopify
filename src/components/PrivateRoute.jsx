import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("seller");
  return <>{auth ? <Outlet /> : <Navigate to="/seller/login" />}</>;
};

export default PrivateRoute;
