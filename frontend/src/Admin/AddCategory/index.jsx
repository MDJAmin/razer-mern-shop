import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";
import { useTranslation } from "react-i18next";
import Search from "../../Components/Admin/Search";
import AddBtn from "../../Components/Admin/AddBtn";

export default function AddCategory() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToToggle, setCategoryIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredData = data?.filter((item) =>
    item?.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Search
        placeholder={t("searchForCategory")}
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
      />
      <div className="overflow-x-auto">
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="text-start px-3 text-xl dark:text-light py-10">
                  {t("loading")}
                </td>
              </tr>
            ) : filteredData?.length === 0 ? (
              <tr>
                <td className="text-start px-3 text-xl dark:text-light py-10 whitespace-nowrap ">
                  {t("noCategoryFound")}
                </td>
              </tr>
            ) : (
              filteredData?.map((item, index) => (
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
      </div>
      <AddBtn content={t("addNewCategory")} />
      <ConfirmationModal
        isVisible={showModal}
        onClose={closeModal}
        onConfirm={toggleActiveStatus}
        message={
          currentStatus ? (
            <span>
              {t("changStatusTo")}{" "}
              <span className="text-error">{t("notActive")}</span>
            </span>
          ) : (
            <span>
              {t("changStatusTo")}{" "}
              <span className="text-dark-green">{t("active")}</span>
            </span>
          )
        }
      />
    </div>
  );
}
