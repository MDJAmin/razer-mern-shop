import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { MdComment, MdDiscount, MdCategory } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

export default function IconBar({ showText }) {
  const [isIconInMobile, setIsIconInMobile] = useState(
    window.innerWidth >= 768
  );
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      setIsIconInMobile(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getActiveClass = (path) =>
    pathname === path && "bg-white-smoke rounded-lg dark:bg-green-800";

  return (
    <div className="flex flex-col items-start justify-start gap-8 border-r-[1px] border-light-gray dark:border-admin-green text-2xl sm:text-3xl md:text-4xl h-screen px-2 sm:px-4 pt-4 dark:text-white">
      {[
        { to: "/admin", icon: <MdDashboard />, text: "DASHBOARD" },
        {
          to: "/admin/products",
          icon: <FiShoppingCart className="p-[2px]" />,
          text: "PRODUCTS",
        },
        { to: "/admin/categories", icon: <MdCategory />, text: "CATEGORIES" },
        {
          to: "/admin/sliders",
          icon: <TfiLayoutSliderAlt className="p-[1px]" />,
          text: "SLIDERS",
        },
        { to: "/admin/users", icon: <FiUser />, text: "USERS" },
        {
          to: "/admin/comments",
          icon: <MdComment className="p-[1px]" />,
          text: "COMMENTS",
        },
        {
          to: "/admin/discounts",
          icon: <MdDiscount className="p-[1px]" />,
          text: "DISCOUNTS",
        },
      ].map(({ to, icon, text }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center justify-start gap-1 lg:gap-2 ${
            showText ? "md:w-[125px] lg:w-36" : "md:w-10"
          }`}
        >
          <div
            className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
              to
            )}`}
            title={text}
          >
            {icon}
          </div>
          {showText && isIconInMobile && (
            <p className="text-lg lg:text-xl transition-opacity duration-100">{text}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
