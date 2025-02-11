import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { MdComment, MdDiscount, MdCategory } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { Link, useLocation } from "react-router-dom";

export default function IconBar() {
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveClass = (path) =>
    pathname === path && "bg-white-smoke rounded-lg dark:bg-green-800";

  return (
    <div className="flex flex-col items-center justify-start gap-8 border-r-[1px] border-light-gray dark:border-admin-green text-2xl sm:text-3xl md:text-4xl             min-h-[93.89vh] px-2 sm:px-4 pt-4 dark:text-white">
      <Link to="/admin">
        <MdDashboard
          title="Dashboard"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin"
          )}`}
        />
      </Link>
      <Link to="/admin/products">
        <FiShoppingCart
          title="Products"
          className={`hover:opacity-80 duration-150 p-[4px] ${getActiveClass(
            "/admin/products"
          )}`}
        />
      </Link>
      <Link to="/admin/categories">
        <MdCategory
          title="Categories"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin/categories"
          )}`}
        />
      </Link>
      <Link to="/admin/sliders">
        <TfiLayoutSliderAlt
          title="Sliders"
          className={`hover:opacity-80 duration-150 p-[2.5px] ${getActiveClass(
            "/admin/sliders"
          )}`}
        />
      </Link>
      <Link to="/admin/users">
        <FiUser
          title="Users"
          className={`hover:opacity-80 duration-150 p-[2px] ${getActiveClass(
            "/admin/users"
          )}`}
        />
      </Link>
      <Link to="/admin/comments">
        <MdComment
          title="Comments"
          className={`hover:opacity-80 duration-150 p-[2.5px] ${getActiveClass(
            "/admin/comments"
          )}`}
        />
      </Link>
      <Link to="/admin/discounts">
        <MdDiscount
          title="Discounts"
          className={`hover:opacity-80 duration-150 p-[3px] ${getActiveClass(
            "/admin/discounts"
          )}`}
        />
      </Link>
    </div>
  );
}
