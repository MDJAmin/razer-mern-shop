import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";
import { useTranslation } from "react-i18next";

export default function AddCategory() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToToggle, setCategoryIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const { token } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}category?populate=subCategory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setData(data.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
    setLoading(false);
  };

  const toggleActiveStatus = async () => {
    try {
      const res = await fetch(`${baseUrl}category/${categoryIdToToggle}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchCategory();
        closeModal();
      } else {
        console.error("Error fetching category:", data.message);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const openModal = (categoryId, isActive) => {
    setCategoryIdToToggle(categoryId);
    setCurrentStatus(isActive);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCategoryIdToToggle(null);
    setCurrentStatus(null);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="overflow-x-auto scrollbar-hide bar p-4 w-full text-[16px]">
      <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
        <thead>
          <tr
            className={` ${
              lang == "en" ? "text-left" : "text-right"
            } text-dark dark:text-light text-lg border-b select-none`}
          >
            <td
              className={`p-3 ${
                lang == "en" ? "pr-8" : "pl-8"
              } whitespace-nowrap`}
            >
              {t("categoryName")}
            </td>
            <td className="p-3 whitespace-nowrap">{t("subCategory")}</td>
            <td
              className={`p-3 ${
                lang == "en" ? "pr-8" : "pl-8"
              } whitespace-nowrap`}
            >
              {t("images")}
            </td>
            <td
              className={`p-3 whitespace-nowrap ${
                lang == "en" ? "pr-8" : "pl-8"
              }`}
            >
              {t("isActive")}
            </td>
            <td
              className={`${
                lang == "en" ? "pr-4" : "pl-4"
              } text-3xl hover:text-dark-green dark:hover:text-light-green cursor-pointer duration-100" title="Add New Product`}
            >
              <GoPlusCircle />
            </td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="text-start px-3 text-xl dark:text-light py-10">
                {t("loading")}
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray dark:border-light hover:opacity-80 select-none"
              >
                <td
                  className={`p-3 text-dark dark:text-light tracking-wider whitespace-nowrap ${
                    lang == "en" ? "pr-6" : "pl-6"
                  }`}
                >
                  {item?.title[lang]}
                </td>
                <td
                  className={`p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap ${
                    lang == "en" ? "pr-8" : "pl-8"
                  }`}
                >
                  {item?.subCategory?.title[lang]}
                </td>
                <td className="p-3">
                  <img
                    src={item?.images[0]}
                    alt={item?.title[lang]}
                    className="w-14 h-14 object-cover rounded-md"
                  />
                </td>
                <td
                  className={`p-3 tracking-wide whitespace-nowrap cursor-pointer ${
                    item?.isActive
                      ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                      : "text-error"
                  }`}
                  onClick={() => openModal(item?._id, item?.isActive)}
                >
                  {item?.isActive ? t("active") : t("notActive")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <ConfirmationModal
        isVisible={showModal}
        onClose={closeModal}
        onConfirm={toggleActiveStatus}
        message={
          currentStatus ? (
            <span>
              {t("changStatusTo")} <span className="text-error">{t("notActive")}</span>
            </span>
          ) : (
            <span>
              {t("changStatusTo")} <span className="text-dark-green">{t("active")}</span>
            </span>
          )
        }
      />
    </div>
  );
}
