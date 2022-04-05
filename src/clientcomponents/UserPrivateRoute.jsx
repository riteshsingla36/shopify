import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
  const auth = localStorage.getItem("user");
  return <div>{auth ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default UserPrivateRoute;
