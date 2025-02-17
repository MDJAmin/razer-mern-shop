import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";
import { useTranslation } from "react-i18next";
import Search from "../../Components/Admin/Search";

export default function AddProduct() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productIdToToggle, setProductIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}product?populate=categoryId`, {
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
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const toggleActiveStatus = async () => {
    try {
      const res = await fetch(`${baseUrl}product/${productIdToToggle}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        closeModal();
      } else {
        console.error("Error fetching products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const filteredData = data?.filter((item) =>
    item?.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (productId, isActive) => {
    setProductIdToToggle(productId);
    setCurrentStatus(isActive);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductIdToToggle(null);
    setCurrentStatus(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="scrollbar-hide overflow-auto p-4 w-full text-[16px]">
      <Search
        placeholder={t("searchForProduct")}
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
            } text-dark dark:text-light text-lg border-b`}
          >
            <td className={`p-3 py-8`}>{t("name")}</td>
            <td className="p-3">{t("date")}</td>
            <td className="p-3">{t("category")}</td>
            <td className={`p-3 ${lang == "en" ? "pr-8" : "pl-8"}`}>
              {t("price")}
            </td>
            <td
              className={`p-3 whitespace-nowrap ${
                lang == "en" ? "pr-8" : "pl-8"
              }`}
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
              } text-3xl hover:text-dark-green dark:hover:text-light-green cursor-pointer duration-100"
              title="Add New Product`}
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
          ) : filteredData?.length === 0 ? (
            <tr>
              <td className="text-start px-3 text-xl dark:text-light py-10 whitespace-nowrap ">
                {t("noProductFound")}
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
                    lang == "en" ? "pr-10" : "pl-10"
                  }`}
                >
                  {item?.name[lang]}
                </td>
                <td
                  className={`p-3 text-gray opacity-60 dark:text-light dark:opacity-80 ${
                    lang == "en" ? "pr-4" : "pl-4"
                  }`}
                >
                  {new Date(item?.updatedAt).toLocaleDateString()}
                </td>
                <td
                  className={`p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap ${
                    lang == "en" ? "pr-4" : "pl-4"
                  }`}
                >
                  {item?.categoryId?.title[lang]}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                  {item.price ? item.price : "Null"}
                </td>
                <td className="p-3">
                  <img
                    src={item?.images[0]}
                    alt={item?.name[lang]}
                    className="w-14 h-14 object-cover rounded-md "
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
