import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbars from "./Navbars";

const UserPrivateRoute = () => {
  const auth = localStorage.getItem("user");
  return (
    <div>
      {auth ? (
        <>
          <Navbars />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default UserPrivateRoute;
