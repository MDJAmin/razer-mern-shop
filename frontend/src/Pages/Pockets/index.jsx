import { useSelector } from "react-redux";
import Notification from "../../Components/Pocket/Notification";
import { useTranslation } from "react-i18next";

export default function Pockets() {
  const { t } = useTranslation();
  const { isNew = null } = useSelector((state) => state.auth);

  return (
    <div className="w-full space-y-2 h-screen p-2 sm:p-4 bg-light-bg dark:text-light dark:bg-black-bg">
      {isNew ? (
        <Notification
          title={t("welcome")}
          content={t("welcomeContent")}
        />
      ): (
        <h2 className="text-2xl">{t("NoNotification")}</h2>
      )}
    </div>
  );
}
