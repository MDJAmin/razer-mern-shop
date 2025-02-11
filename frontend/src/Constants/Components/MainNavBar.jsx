import React from "react";
import AdminNavBar from "../../Components/Layout/Navbar/AdminNavBar";
import NavBar from "../../Components/Layout/Navbar/Navbar";

export default function MainNavBar({ isAdmin, handleShowText }) {
  return isAdmin ? <AdminNavBar handleShowText={handleShowText} /> : <NavBar />;
}
