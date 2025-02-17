import React from "react";
import { useSelector } from "react-redux";

export default function Search({
  searchQuery,
  placeholder,
  onChange,
  onClear,
}) {
  const { lang } = useSelector((state) => state.i18n);

  return (
    <div className="mb-2 relative">
      <input
        type="text"
        className="authInp text-lg py-2 "
        placeholder={placeholder}
        value={searchQuery}
        onChange={onChange}
      />
      {searchQuery && (
        <span
          className={`top-1 ${
            lang == "en" ? "right-4" : "left-4"
          } text-4xl dark:text-light rotate-45 absolute hover:opacity-80 cursor-pointer`}
          onClick={onClear}
        >
          +
        </span>
      )}
    </div>
  );
}
