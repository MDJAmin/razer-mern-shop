import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";
import { useTranslation } from "react-i18next";
import Search from "../../Components/Admin/Search";

export default function Comments() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToToggle, setCommentIdToToggle] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}comment?populate=userId,productId`, {
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
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  };

  const toggleActiveStatus = async () => {
    try {
      const res = await fetch(`${baseUrl}comment/${commentIdToToggle}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        closeModal();
      } else {
        console.error("Error fetching comments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const filteredData = data?.filter((item) =>
    item?.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (commentId) => {
    setCommentIdToToggle(commentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCommentIdToToggle(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const copyToClipboard = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="scrollbar-hide overflow-auto p-4 w-full text-[16px]">
      <Search
        placeholder={t("searchForComment")}
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
              <td className="p-3 py-8 inline-block w-16">{t("content")}</td>
              <td className="p-3 px-5 whitespace-nowrap">{t("productId")}</td>
              <td className="p-3 whitespace-nowrap">{t("userId")}</td>
              <td className="p-3 whitespace-nowrap">{t("rating")}</td>
              <td className="p-3 whitespace-nowrap">{t("reply")}</td>
              <td className="p-3 whitespace-nowrap">{t("date")}</td>
              <td className="p-3 whitespace-nowrap">{t("isCustomer")}</td>
              <td className="p-3 whitespace-nowrap">{t("isPublish")}</td>
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
                  {t("noCommentFound")}
                </td>
              </tr>
            ) : (
              filteredData?.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray dark:border-light hover:opacity-80 select-none"
                >
                  <td className="p-3 min-w-60 lg:w-72 text-dark dark:text-light tracking-wider cursor-pointer">
                    {item?.content}
                  </td>
                  <td
                    className="p-3 px-5 text-dark dark:text-light tracking-wider whitespace-nowrap cursor-pointer hover:underline"
                    onClick={() => copyToClipboard(item?.productId._id)}
                    title={t("clickToCopy")}
                  >
                    {item?.productId._id.slice(0, 8)}...
                  </td>
                  <td
                    className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap cursor-pointer hover:underline"
                    onClick={() => copyToClipboard(item?.userId._id)}
                    title={t("clickToCopy")}
                  >
                    {item?.userId._id.slice(0, 8)}...
                  </td>
                  <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap">
                    {item?.rating ? item.rating : t("null")}
                  </td>
                  <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap">
                    {item?.reply.lenght > 0 ? item.reply : t("null")}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                    {new Date(item?.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap text-start">
                    {item?.isCustomer ? t("yes") : t("no")}
                  </td>
                  <td
                    className={`p-3 tracking-wide whitespace-nowrap ${
                      item?.isPublish
                        ? "text-dark-green dark:text-light-green "
                        : "text-error cursor-pointer"
                    }`}
                    onClick={() => !item?.isPublish && openModal(item?._id)}
                  >
                    {item?.isPublish ? t("publish") : t("notPublish")}
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
          <span>
            {t("changStatusTo")}{" "}
            <span className="text-dark-green">{t("publish")}</span>
          </span>
        }
      />
    </div>
  );
}
