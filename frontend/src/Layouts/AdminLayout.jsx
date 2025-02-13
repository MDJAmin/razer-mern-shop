import React, { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import IconBar from "../Components/Admin/IconBar";
import MainNavBar from "../Constants/Components/MainNavbar";

const MemoizedMainNavBar = React.memo(MainNavBar);
const MemoizedIconBar = React.memo(IconBar);

export default function AdminLayout() {
  const [showText, setShowText] = useState(false);

  const handleShowText = useCallback(() => {
    setShowText((prev) => !prev);
  }, []);

  return (
    <div className="bg-light-bg dark:bg-black-bg min-h-screen">
      <div className="border-b-[1px] border-gray border-opacity-50 dark:border-admin-green">
        <MemoizedMainNavBar handleShowText={handleShowText} isAdmin={true} />
      </div>
      <div className="flex justify-start items-start xl:min-h-[calc(100vh-73px)]">
        <MemoizedIconBar showText={showText} />
        <Outlet /> 
      </div>
    </div>
  );
}
