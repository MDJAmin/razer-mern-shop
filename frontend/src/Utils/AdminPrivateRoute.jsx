import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { role = null } = useSelector((state) => state.user);
  return role == "admin" || role == "superAdmin" ? (
    <Outlet />
  ) : (
    <Navigate to="/not-found" />
  );
}
