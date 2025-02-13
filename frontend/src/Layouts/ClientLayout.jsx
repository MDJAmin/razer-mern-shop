import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNavBar from "../Constants/Components/MainNavBar";

export default function ClientLayout() {
  const location = useLocation();
  const hideNavBarOnAuthPage =
    location.pathname === "/auth" || location.pathname === "/not-found";
    
  return (
    <>
      {!hideNavBarOnAuthPage && <MainNavBar isAdmin={false} />}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
