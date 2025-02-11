import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/logoWithText.png";
import { TbSearch } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import ThemeToggle from "../../Common/Button/ThemeToggle";
import { TfiMenuAlt } from "react-icons/tfi";

export default function AdminNavbar({handleShowText}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className='flex justify-between items-center px-6 py-4 bg-white dark:bg-black text-gray dark:text-white-smoke shadow-md'>
      <ul className='flex items-center gap-4'>
        <TfiMenuAlt className='text-2xl cursor-pointer hover:text-light-gray dark:hover:text-soft-green hidden md:inline-block' onClick={handleShowText} />
        <img
          src={logo}
          alt='Logo'
          className={"h-8 sm:h-10"}
        />
      </ul>
      <ul className='sm:hidden'>
        <GiHamburgerMenu
          className='text-2xl cursor-pointer hover:text-light-gray dark:hover:text-soft-green'
          onClick={() => setMenuOpen(true)}
        />
      </ul>
      <ul className='hidden sm:flex items-center gap-6 text-2xl'>
        <li className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'>
          <TbSearch />
        </li>
        <li className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'>
          <IoMdNotificationsOutline />
        </li>
        <li className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'>
          <FiUser />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
      <div
        className={`fixed top-0 right-0 h-full w-64 z-10 bg-white dark:bg-dark-green shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex justify-end p-4'>
          <IoMdClose
            className='text-3xl cursor-pointer hover:text-light-green'
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <ul className='flex flex-col items-center gap-8 text-2xl p-6'>
          <li className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'>
            <TbSearch />
          </li>
          <li className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'>
            <IoMdNotificationsOutline />
          </li>
          <li
            className='cursor-pointer hover:text-light-gray dark:hover:text-soft-green'
            onClick={() => navigate("/auth")}
          >
            <FiUser />
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
      {menuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-9'
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
