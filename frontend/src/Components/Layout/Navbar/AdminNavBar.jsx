import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/logoWithText.png";
import { TbSearch } from "react-icons/tb";
import { IoMdNotificationsOutline, IoMdClose } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import ThemeToggle from "../../Common/Button/ThemeToggle";
import LanguageSwitcher from "../../Common/Selector/LanguageSwitcher";

export default function AdminNavbar({ handleShowText }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className='flex justify-between items-center px-6 py-4 bg-light dark:bg-black-bg text-gray dark:text-light shadow-md'>
      {/* Left Side */}
      <div className='flex items-center gap-4'>
        <GiHamburgerMenu
          className='text-2xl select-none cursor-pointer hover:opacity-80 dark:hover:text-white hidden md:inline-block'
          onClick={handleShowText}
        />
        <img
          src={logo}
          alt='Logo'
          className='h-10'
        />
      </div>

      {/* Desktop Icons */}
      <ul className='hidden sm:flex items-center gap-6 text-2xl'>
        <li className='cursor-pointer hover:opacity-80 dark:hover:text-white'>
          <TbSearch />
        </li>
        <li className='cursor-pointer hover:opacity-80 dark:hover:text-white'>
          <IoMdNotificationsOutline />
        </li>
        <li
          className='cursor-pointer hover:opacity-80 dark:hover:text-white'
          onClick={() => navigate("/auth")}
        >
          <FiUser />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className='sm:hidden'>
        <GiHamburgerMenu
          className='text-2xl cursor-pointer hover:opacity-80 dark:hover:text-white'
          onClick={() => setMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-light dark:bg-black-bg shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex justify-end p-4'>
          <IoMdClose
            className='text-3xl cursor-pointer hover:opacity-80 dark:hover:text-white'
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <ul className='flex flex-col items-center gap-6 text-2xl p-6'>
          <li className='cursor-pointer hover:opacity-80 dark:hover:text-white'>
            <TbSearch />
          </li>
          <li className='cursor-pointer hover:opacity-80 dark:hover:text-white'>
            <IoMdNotificationsOutline />
          </li>
          <li
            className='cursor-pointer hover:opacity-80 dark:hover:text-white'
            onClick={() => navigate("/auth")}
          >
            <FiUser />
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className='fixed inset-0 bg-dark bg-opacity-50 z-40'
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
