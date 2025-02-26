import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DirectionHandler() {
  const lang = useSelector((state) => state.i18n.lang);

  useEffect(() => {
    document.documentElement.lang = lang; 
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"; 
  }, [lang]);

  return null;
}
