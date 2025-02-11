import React, { useState } from "react";
import CurrentDate from "../../Components/Common/Date";
import { useSelector } from "react-redux";

export default function AdminPanel() {
  const { email } = useSelector((state) => state.user.currentUser);
  const shortMail = email.split("@")[0];

  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full px-6 py-4">
      <div className="bg-white-smoke bg-opacity-50 dark:bg-admin-green py-4 px-6 flex flex-wrap gap-x-12 justify-between w-full text-xl rounded-lg">
        <h2 className="text-xl sm:text-2xl dark:text-white">
          Welcome Dear "{shortMail}"
        </h2>
        <CurrentDate />
      </div>
      <div className="grid grid-cols-12 gap-2 w-full">
        <div className="col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 1 (2 Cols)
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 2 (1 Col)
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 3 (2 Col)
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 1 (2 Cols)
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 2 (1 Col)
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5 bg-white-smoke bg-opacity-50 dark:bg-admin-green dark:text-white text-xl py-24 text-center rounded-lg">
          Item 3 (2 Col)
        </div>
      </div>
    </div>
  );
}
