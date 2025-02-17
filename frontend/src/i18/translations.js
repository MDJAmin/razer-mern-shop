import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "This is home page to english",
      dashboard: "dashboard",
      categories: "categories",
      products: "products",
      sliders: "sliders",
      users: "users",
      comments: "comments",
      discounts: "discounts",
      welcomeDear: "Welcome Dear",
    },
  },
  fa: {
    translation: {
      home: "این صحفه خانه می باشد به زبان فارسی",
      dashboard: "پنل ادمین",
      categories: "دسته بندی ها",
      products: "محصولات",
      sliders: "اسلایدر ها",
      users: "کاربر ها",
      comments: "نظرات",
      discounts: "تخفیف ها",
      welcomeDear: "خوش آمدید",
    },
  },
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
