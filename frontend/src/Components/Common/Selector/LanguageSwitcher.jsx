import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../Context/Slices/i18nSlice";

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.i18n.lang);

  const changeLanguage = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <select value={lang} onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="pr">Persian</option>
    </select>
  );
}
