import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { token } = useSelector((state) => state.user);
  return token ? <Outlet /> : <Navigate to="/auth" />;
}
