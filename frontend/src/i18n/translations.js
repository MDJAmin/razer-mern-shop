import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // General
      home: "This is home page to english",
      welcomeDear: "Welcome Dear",
      welcome: "Welcome To Razer Website",
      welcomeContent:
        "Welcome to Razer Store – the ultimate destination for power, speed, and innovation in gaming gear!...",
      someThingWentWrong: "Something went wrong",
      loading: "Loading...",
      null: "Null",
      yes: "Yes",
      no: "No",

      // Navigation
      dashboard: "Dashboard",
      categories: "Categories",
      products: "Products",
      sliders: "Sliders",
      users: "Users",
      comments: "Comments",
      discounts: "Discounts",

      // Product
      name: "Name",
      date: "Date",
      price: "Price",
      createProduct: "Create Product",
      category: "Category",
      images: "Images",
      isActive: "Is Active",
      active: "Active",
      notActive: "Not Active",
      changStatusTo: "Change Status To",
      change: "Change",
      cancel: "Cancel",
      addNewProduct: "Add New Product",
      noProductFound: "No Product Found!",
      searchForProduct: "Search For Product:",
      bestProductsBasedOnSales: "Best Products Based On Sales",

      // Category
      categoryName: "Name",
      subCategory: "Sub Category",
      addNewCategory: "Add New Category",
      noCategoryFound: "No Category Found!",
      searchForCategory: "Search For Category:",

      // User
      userId: "User ID",
      role: "Role",
      fullName: "Full Name",
      email: "Email",
      idCard: "ID Card",
      phone: "Phone",
      complete: "Complete",
      notComplete: "Not Complete",
      admin: "Admin",
      superAdmin: "Super Admin",
      user: "User",
      clickToChangeRole: "Click to change role",
      clickToCopy: "Click to copy",
      searchForUser: "Search For User:",
      noUserFound: "No Users found!",
      changeRoleForThisUserTo: "Change role for this user to",
      clickToSeeProfile: "Click To See Profile",
      userProfile: "User Profile",
      isComplete: "Is Complete",
      updateUserInfo: "Update User Information?",

      // Comment
      searchForComment: "Search For Comment:",
      content: "Content",
      productId: "Product ID",
      rating: "Rating",
      reply: "Reply",
      isCustomer: "Is Customer",
      isPublish: "Is Publish",
      noCommentFound: "No Comment Found!",
      publish: "Publish",
      notPublish: "Not Publish",

      // Authentication
      welcomeBack: "Welcome Back!",
      PleaseEnterYour: "Please enter your",
      phoneNumber: "Phone Number",
      emailOrPhoneNumber: "Email or Phone number",
      password: "Password",
      enterYourPassword: "Enter Your Password",
      signIn: "Sign In",
      forgetYourPassword: "Forget Your Password?",
      sendCode: "Send Code",
      enterVerificationCode: "Enter verification code",
      verificationCodeHasBeenSentTo: "Verification code has been sent to",
      confirm: "Confirm",
      continueWithPassword: "Continue with password",
      clickHere: "Click here",
      toResendCode: "to resend code",
      remainingToReceiveNewCode: "Remaining to receive new code",
    },
  },
  fa: {
    translation: {
      // General
      home: "این صحفه خانه می باشد به زبان فارسی",
      welcomeDear: "خوش آمدید",
      welcome: "به فروشگاه ریزر خوش آمدید",
      welcomeContent: "به فروشگاه ریزر خوش آمدید – دنیایی از قدرت، سرعت و نوآوری در تجهیزات گیمینگ!...",
      someThingWentWrong: "مشکلی پیش آمده است مجدد تلاش کنید",
      loading: "بارگذاری...",
      null: "خالی",
      yes: "بلی",
      no: "خیر",

      // Navigation
      dashboard: "پنل ادمین",
      categories: "دسته بندی ها",
      products: "محصولات",
      sliders: "اسلایدر ها",
      users: "کاربر ها",
      comments: "نظرات",
      discounts: "تخفیف ها",

      // Product
      name: "نام محصول",
      date: "تاریخ",
      price: "قیمت",
      createProduct: "ساخت محصول",
      category: "دسته بندی",
      images: "عکس ها",
      isActive: "وضعیت",
      active: "فعال",
      notActive: "غیرفعال",
      changStatusTo: "تغییر وضعیت به",
      change: "تغییر",
      cancel: "لغو",
      addNewProduct: "افزودن محصول جدید",
      noProductFound: "محصولی یافت نشد",
      searchForProduct: "محصول را جستوجو کنید:",
      bestProductsBasedOnSales: "بهترین محصولات بر اساس فروش",

      // User
      userId: "شناسه کابر",
      role: "نقش",
      fullName: "اسم و فامیل",
      email: "ایمیل",
      phone: "شماره تلفن",
      complete: "کامل شده",
      notComplete: "کامل نشده",
      admin: "ادمین",
      superAdmin: "مدیر",
      user: "کاربر",
      clickToChangeRole: "برای تغییر نقش کلیک کنید",
      clickToCopy: "برای کپی شدن کلیک کنید",
      searchForUser: "کاربر را جستوجو کنید:",
      noUserFound: "کاربری یافت نشد",
      changeRoleForThisUserTo: "تغییر نقش برای این کاربر به",
      clickToSeeProfile: "برای مشاهده پروفایل کلیک کنید",
      userProfile: "مشخصات کاربر",
      isComplete: "تکمیل شده",
      updateUserInfo: "بروز رسانی اطلاعات کاربر؟",
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
