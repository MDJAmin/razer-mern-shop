import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { role = "" } = useSelector((state) => state.user.currentUser);
  return role == "admin" || "superAdmin" ? (
    <Outlet />
  ) : (
    <Navigate to="/not-found" />
  );
}
