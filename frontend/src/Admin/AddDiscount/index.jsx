import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Search from "../../Components/Admin/Search";
import AddBtn from "../../Components/Admin/AddBtn";

export default function AddDiscount() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [discountIdToToggle, setDiscountIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}discount`, {
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
      const res = await fetch(`${baseUrl}discount/${discountIdToToggle}`, {
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
        console.error("Error fetching discounts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };


  const filteredData = data?.filter((item) =>
    item?.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (productId, isActive) => {
    setDiscountIdToToggle(productId);
    setCurrentStatus(isActive);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setDiscountIdToToggle(null);
    setCurrentStatus(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="scrollbar-hide overflow-auto p-4 w-full text-[16px]">
      <Search
        placeholder={t("searchForDiscount")}
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
      />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
          <thead>
            <tr
              className={`${
                lang == "en" ? "text-left" : "text-right"
              } text-dark dark:text-light text-lg border-b`}
            >
              <td className="p-3 py-8 whitespace-nowrap">{t("code")}</td>
              <td className="p-3 whitespace-nowrap">{t("percent")}</td>
              <td className="p-3 whitespace-nowrap">{t("startTime")}</td>
              <td className="p-3 whitespace-nowrap">{t("endTime")}</td>
              <td className="p-3 whitespace-nowrap">{t("freeShipping")}</td>
              <td className="p-3 whitespace-nowrap">{t("useableNumber")}</td>
              <td className="p-3 whitespace-nowrap">{t("userIdUsed")}</td>
              <td className="p-3 whitespace-nowrap">{t("isActive")}</td>
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
                  {t("noDiscountFound")}
                </td>
              </tr>
            ) : (
              filteredData?.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray dark:border-light hover:opacity-80 select-none"
                >
                  <td className="p-3 text-dark dark:text-light tracking-wider">
                    {item?.code}
                  </td>
                  <td className="p-3 px-5 text-dark dark:text-light tracking-wider opacity-70">
                    {item?.percent}%
                  </td>
                  <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap opacity-70">
                    {item?.startTime}
                  </td>
                  <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap opacity-70">
                    {item?.endTime}
                  </td>
                  <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap opacity-70">
                    {item?.freeShipping ? t("yes") : t("no")}
                  </td>
                  <td className="p-3 text-gray dark:text-light dark:opacity-80 opacity-70">
                    {item?.useableNumber}
                  </td>
                  <td className="p-3 text-gray dark:text-light dark:opacity-80 whitespace-nowrap opacity-70">
                    {item?.userIdUsed.lenght === 0? item.userIdUsed : t("null")}
                  </td>
                  <td
                    className={`p-3 tracking-wide whitespace-nowrap ${
                      item?.isActive
                        ? "text-dark-green dark:text-light-green "
                        : "text-error cursor-pointer"
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
      <AddBtn content={t("addNewDiscount")} />
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
