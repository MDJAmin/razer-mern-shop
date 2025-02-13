import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../Context/Slices/themeSlice";
import { RiMoonFill } from "react-icons/ri";
import { PiSunFill } from "react-icons/pi";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="sm:pt-2 text-2xl cursor-pointer hover:text-placeHolder dark:hover:text-white transition-colors duration-300"
      aria-label={theme === "light" ? "Enable dark mode" : "Enable light mode"}
    >
      {theme === "light" ? <RiMoonFill /> : <PiSunFill />}
    </button>
  );
};

export default ThemeToggle;
