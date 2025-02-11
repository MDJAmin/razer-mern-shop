import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../Context/Slices/themeSlice";
import { RiMoonFill } from "react-icons/ri";
import { PiSunFill } from "react-icons/pi";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="sm:pt-2 hover:text-light-gray dark:hover:text-soft-green transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <span role="img" aria-label="moon">
          <RiMoonFill />
        </span>
      ) : (
        <span role="img" aria-label="sun">
          <PiSunFill />
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
