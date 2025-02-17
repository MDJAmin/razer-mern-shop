import React from "react";
import LanguageSwitcher from "../../Components/Common/Selector/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full h-screen text-3xl bg-light-bg dark:bg-black-bg text-black dark:text-white p-4">
        <LanguageSwitcher />
        <p className="m-4 tracking-wider">{t("home")}</p>
      </div>
    </>
  );
}
