import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../../Context/Slices/themeSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme()); 
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <span role="img" aria-label="moon">🌙</span>
      ) : (
        <span role="img" aria-label="sun">☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
