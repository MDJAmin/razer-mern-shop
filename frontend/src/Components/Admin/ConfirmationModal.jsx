import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmationModal = ({ isVisible, onClose, onConfirm, message }) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-light dark:bg-dark dark:bg-opacity-60 bg-opacity-60 p-1">
      <div className="bg-light-bg dark:bg-black-bg p-4 rounded-md drop-shadow-lg">
        <h2 className="text-lg sm:text-2xl mb-6 dark:text-light">{message}</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="authBtn bg-error dark:bg-error">
            {t("cancel")}
          </button>
          <button onClick={onConfirm} className="authBtn">
            {t("change")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
