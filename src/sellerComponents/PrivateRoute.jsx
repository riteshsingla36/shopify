import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PrivateRoute = () => {
  const auth = localStorage.getItem("seller");
  return (
    <>
      {auth ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/seller/login" />
      )}
    </>
  );
};

export default PrivateRoute;
