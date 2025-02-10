import React from "react";

export default function CurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day} - ${month} - ${year}`;

  return <span className="dark:text-white text-lg sm:text-xl">{formattedDate}</span>;
}
