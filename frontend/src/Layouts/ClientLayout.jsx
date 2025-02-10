import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar/Navbar";

export default function ClientLayout() {
  const location = useLocation();
  const hideNavBarOnAuthPage =
    location.pathname === "/auth";
  return (
    <>
        {!hideNavBarOnAuthPage && <Navbar />}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
