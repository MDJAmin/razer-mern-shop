import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { Hi: "Hello" } },
  pr: { translation: { Hi: "سلام" } },
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  })
  .then(() => {
    i18next.isInitialized = true; 
  });

export default i18next;
