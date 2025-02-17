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
      name: "Name",
      date: "Date",
      price: "Price",
      category: "Category",
      images: "Images",
      isActive: "Is Active",
      loading: "Loading...",
      active: "Active",
      notActive: "Not Avtive",
      changStatusTo: "Change Status To",
      change: "Change",
      cancel: "Cancel",
      categoryName : "Name",
      subCategory: "Sub Category"
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
      name: "نام محصول",
      date: "تاریخ",
      price: "قیمت",
      category: "دسته بندی",
      images: "عکس ها",
      isActive: "وضعیت",
      loading: "بارگذاری...",
      active: "فعال",
      notActive: "غیرفعال",
      changStatusTo: "تغییر وضعیت به",
      change: "تغییر",
      cancel: "لغو",
      categoryName: "نام دسته بندی",
      subCategory: "زیر دسته بندی"
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
