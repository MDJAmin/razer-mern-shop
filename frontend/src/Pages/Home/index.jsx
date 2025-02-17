import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <p className='w-full h-full text-3xl underline bg-white dark:bg-black text-black dark:text-white'>
        {t("Hi")}
      </p>
    </>
  );
}
