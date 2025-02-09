import React from "react";
import logo from "../../../Assets/logoWithText.png";
import { TbSearch } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import ThemeToggle from "../../Common/Button/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-black text-gray dark:text-white-smoke shadow-md">
      <img src={logo} alt="Logo" className="h-10" />
      <ul className="flex items-center gap-6 text-2xl">
        <li className="cursor-pointer hover:text-light-gray dark:hover:text-soft-green"><TbSearch /></li>
        <li className="cursor-pointer hover:text-light-gray dark:hover:text-soft-green"><IoMdNotificationsOutline /></li>
        <li className="cursor-pointer hover:text-light-gray dark:hover:text-soft-green"><FiUser /></li>
        <li className="cursor-pointer hover:text-light-gray dark:hover:text-soft-green"><BsCart2 /></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  );
}
