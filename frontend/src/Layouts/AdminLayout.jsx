import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
