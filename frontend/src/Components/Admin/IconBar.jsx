import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { MdComment, MdDiscount, MdCategory } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

export default function IconBar({ showText }) {
  const [isIconInMobile, setIsIconInMobile] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const handleReSize = () => {
      if (window.innerWidth >= 768) {
        setIsIconInMobile(true);
      }
    };
    window.addEventListener("resize", handleReSize);

    return window.removeEventListener("resize", handleReSize);
  }, []);

  const getActiveClass = (path) =>
    pathname === path && "bg-white-smoke rounded-lg dark:bg-green-800";

  return (
    <div className="flex flex-col items-start justify-start gap-8 border-r-[1px] border-light-gray dark:border-admin-green text-2xl sm:text-3xl md:text-4xl h-screen px-2 sm:px-4 pt-4 dark:text-white">
      <Link
        to="/admin"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <MdDashboard
          title="Dashboard"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>DASHBOARD</p>
        )}
      </Link>

      <Link
        to="/admin/products"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <FiShoppingCart
          title="Products"
          className={`hover:opacity-80 duration-150 p-[4px] ${getActiveClass(
            "/admin/products"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>PRODUCTS</p>
        )}
      </Link>
      <Link
        to="/admin/categories"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <MdCategory
          title="Categories"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin/categories"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>
            CATEGORIES
          </p>
        )}
      </Link>
      <Link
        to="/admin/sliders"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <TfiLayoutSliderAlt
          title="Sliders"
          className={`hover:opacity-80 duration-150 p-[2.5px] ${getActiveClass(
            "/admin/sliders"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>SLIDERS</p>
        )}
      </Link>
      <Link
        to="/admin/users"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <FiUser
          title="Users"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin/users"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>USERS</p>
        )}
      </Link>
      <Link
        to="/admin/comments"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <MdComment
          title="Comments"
          className={`hover:opacity-80 duration-150 p-[2.5px] ${getActiveClass(
            "/admin/comments"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>COMMENTS</p>
        )}
      </Link>
      <Link
        to="/admin/discounts"
        className={`flex items-center justify-start gap-2 ${
          showText ? "md:w-36" : "md:w-10"
        }`}
      >
        <MdDiscount
          title="Discounts"
          className={`hover:opacity-80 duration-150 p-[3px] ${getActiveClass(
            "/admin/discounts"
          )}`}
        />
        {showText && isIconInMobile && (
          <p className={`text-xl transition-opacity duration-100`}>DISCOUNTS</p>
        )}
      </Link>
    </div>
  );
}
