import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../Assets/logoWithText.png";
import { TbSearch } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import ThemeToggle from "../../Common/Button/ThemeToggle";
import LanguageSwitcher from "../../Common/Selector/LanguageSwitcher";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { role } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { isNew = null } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex justify-between items-center px-2 sm:px-6 py-4 bg-light dark:bg-black-bg text-gray dark:text-light shadow-md">
      <img src={logo} alt="Logo" className="h-10 select-none" />
      <div className="sm:hidden">
        <GiHamburgerMenu
          className="text-2xl cursor-pointer hover:opacity-80"
          onClick={() => setMenuOpen(true)}
        />
      </div>
      <ul className="hidden sm:flex items-center gap-6 text-2xl">
        <li>
          <LanguageSwitcher />
        </li>
        <li
          className="cursor-pointer hover:opacity-80"
          onClick={() => navigate("/")}
        >
          <AiOutlineHome />
        </li>
        <li className="cursor-pointer hover:opacity-80">
          <TbSearch />
        </li>
        <li
          className="cursor-pointer hover:opacity-80 relative"
          onClick={() => navigate("/pockets")}
        >
          <IoMdNotificationsOutline />
          {isNew && (
            <div className="absolute rounded-full text-light bg-error -top-[6px] -right-[1px] text-sm px-1 ">
              !
            </div>
          )}
        </li>
        {role === "admin" || role === "superAdmin" ? (
          <li
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate("/admin")}
          >
            <RiAdminLine />
          </li>
        ) : (
          <li
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate(token ? `/profile/${id}` : "/auth")}
          >
            <FiUser />
          </li>
        )}
        <li className="cursor-pointer hover:opacity-80">
          <BsCart2 />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>

      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-light dark:bg-black-bg shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <IoMdClose
            className="text-3xl cursor-pointer hover:opacity-80"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <ul className="flex flex-col items-center gap-6 text-2xl p-6">
          <li
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate("/")}
          >
            <AiOutlineHome />
          </li>
          <li className="cursor-pointer hover:opacity-80">
            <TbSearch />
          </li>
          <li
            className="cursor-pointer hover:opacity-80 relative"
            onClick={() => navigate("/pockets")}
          >
            <IoMdNotificationsOutline />
            {isNew && (
              <div className="absolute rounded-full text-light bg-error -top-[6px] -right-[1px] text-sm px-1 ">
                !
              </div>
            )}
          </li>
          {role === "admin" || role === "superAdmin" ? (
            <li
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate("/admin")}
            >
              <RiAdminLine />
            </li>
          ) : (
            <li
              className="cursor-pointer hover:opacity-80"
              onClick={() => navigate(token ? `/profile/${id}` : "/auth")}
            >
              <FiUser />
            </li>
          )}
          <li className="cursor-pointer hover:opacity-80">
            <BsCart2 />
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-dark bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
