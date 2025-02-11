import React from "react";
import IconBar from "../../Components/Admin/IconBar";
import AdminNavbar from "../../Components/Layout/Navbar/AdminNavBar";

export default function AddSlider() {
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="border-b-[1px] border-light-gray dark:border-admin-green">
        <AdminNavbar />
      </div>
      <div className="flex justify-start items-start">
        <IconBar />
        <div className="text-4xl dark:text-white p-4">ADD SLIDER</div>
      </div>
    </div>
  );
}
