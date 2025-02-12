import React, { useState } from "react";
import CurrentDate from "../../Components/Common/Date";
import { useSelector } from "react-redux";

export default function AdminPanel() {
  const { email } = useSelector((state) => state.user.currentUser);
  const shortMail = email.split("@")[0];

  const containerClass =
    "bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg";
  const gridItem1Class =
    "col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5";
  const gridItem2Class =
    "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2";

  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full px-6 py-4">
      <div className="bg-white-smoke bg-opacity-50 dark:bg-admin-green py-4 px-6 flex flex-wrap gap-x-12 justify-between w-full text-xl rounded-lg">
        <h2 className="text-xl sm:text-2xl dark:text-white">
          Welcome Dear "{shortMail}"
        </h2>
        <CurrentDate />
      </div>
      <div className="grid grid-cols-12 gap-2 w-full">
        <div className={`${gridItem1Class} ${containerClass}`}>
          Item 1 (2 Cols)
        </div>
        <div className={`${gridItem2Class} ${containerClass}`}>
          Item 2 (1 Col)
        </div>
        <div className={`${gridItem1Class} ${containerClass}`}>
          Item 3 (2 Cols)
        </div>
        <div className={`${gridItem1Class} ${containerClass}`}>
          Item 4 (2 Cols)
        </div>
        <div className={`${gridItem2Class} ${containerClass}`}>
          Item 5 (1 Col)
        </div>
        <div className={`${gridItem1Class} ${containerClass}`}>
          Item 6 (2 Cols)
        </div>
      </div>
    </div>
  );
}
