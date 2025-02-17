import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { MdComment, MdDiscount, MdCategory } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function IconBar({ showText }) {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.i18n);
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
    pathname === path &&
    "bg-admin-gray rounded-lg dark:bg-admin-green";

  return (
    <div
      className={`flex flex-col items-start justify-start gap-8 ${
        lang === "en" ? "border-r-[1px]" : "border-l-[1px]"
      } border-gray border-opacity-50 dark:border-admin-green text-2xl sm:text-3xl md:text-4xl pb-4 px-2 sm:px-4 pt-4 dark:text-light sticky top-0 h-screen`}
    >
      {[
        {
          to: "/admin",
          icon: <MdDashboard />,
          text: `${t("dashboard")}`,
        },
        {
          to: "/admin/products",
          icon: <FiShoppingCart className='p-[2px]' />,
          text: `${t("products")}`,
        },
        {
          to: "/admin/categories",
          icon: <MdCategory />,
          text: `${t("categories")}`,
        },
        {
          to: "/admin/sliders",
          icon: <TfiLayoutSliderAlt className='p-[1px]' />,
          text: `${t("sliders")}`,
        },
        {
          to: "/admin/users",
          icon: <FiUser />,
          text: `${t("users")}`,
        },
        {
          to: "/admin/comments",
          icon: <MdComment className='p-[1px]' />,
          text: `${t("comments")}`,
        },
        {
          to: "/admin/discounts",
          icon: <MdDiscount className='p-[1px]' />,
          text: `${t("discounts")}`,
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
            <p className='text-lg lg:text-xl uppercase'>{text}</p>
          )}
        </Link>
      ))}
    </div>
  );
}