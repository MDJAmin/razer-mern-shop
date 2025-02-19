import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../Context/Slices/i18nSlice";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.i18n.lang);

  const changeLanguage = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="relative">
      <select
        value={lang}
        onChange={changeLanguage}
        className="bg-light-bg dark:bg-dark text-dark dark:text-light px-4 py-2 rounded-lg focus:outline-none text-lg cursor-pointer"
      >
        <option value="en" className="text-dark dark:text-light">
          English
        </option>
        <option value="fa" className="text-dark dark:text-light">
          فارسی
        </option>
      </select>
    </div>
  );
}
