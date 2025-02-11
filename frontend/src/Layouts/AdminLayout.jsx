import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import IconBar from "../Components/Admin/IconBar";
import MainNavBar from "../Constants/Components/MainNavbar";

export default function AdminLayout() {
  const [showText, setShowText] = useState(false);

  function handleShowText() {
    setShowText(!showText);
  }
  return (
    <>
      <div className="bg-white dark:bg-black min-h-screen">
        <div className="border-b-[1px] border-light-gray dark:border-admin-green">
          <MainNavBar handleShowText={handleShowText} isAdmin={true} />
        </div>
        <div className="flex justify-start items-start">
          <IconBar showText={showText} />
          <Outlet />
        </div>
      </div>
    </>
  );
}
