import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";  

const UnprotectedRoute = () => {
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  if (!isAuthenticated) return <Outlet />;

  return <Navigate to={"/"} />;
};

export default UnprotectedRoute;
