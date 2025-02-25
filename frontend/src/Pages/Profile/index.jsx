import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdOutlineDownloadDone } from "react-icons/md";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";

export default function Profile() {
  const { t } = useTranslation();
  const { token, role } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);
  const { userId } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (result.success) {
          setUser(result.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId, token]);

  const handleSubmit = (e) => {
    console.log("user Updated");
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex relative items-start lg:items-center justify-center p-3 text-lg w-full min-h-screen bg-light-bg dark:bg-black-bg">
      <div className="w-[800px] min-h-[550px] md:min-h-[400px] bg-light dark:bg-dark dark:text-light rounded-lg lg:-translate-y-14">
        {loading ? (
          <p className="text-start p-4 text-2xl">{t("loading")}</p>
        ) : user ? (
          <div className="bg-light dark:bg-dark p-3 sm:p-5 rounded-lg drop-shadow-lg">
            <h2 className="text-3xl sm:text-4xl dark:text-light mb-4">
              {t("userProfile")}
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-wrap gap-2">
                  <label className="dark:text-light opacity-60">
                    {t("userId")}:
                  </label>
                  <p className="dark:text-light flex items-center gap-1 text-sm sm:text-lg ">
                    {user?._id}{" "}
                    <span className="text-xl sm:text-2xl">
                      <MdOutlineDownloadDone />
                    </span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <label className=" opacity-60 dark:text-light">
                    {t("role")}:
                  </label>
                  <select
                    type="text"
                    defaultValue={user?.role}
                    disabled={!role === "superAdmin" && !role === "admin"}
                    className={` ${
                      user.role === "admin"
                        ? "text-dark-green dark:text-light-green"
                        : "dark:text-light"
                    } disabled:opacity-100 text-dark bg-transparent outline-none border-none`}
                  >
                    <option value="admin" className="text-dark">
                      {t("admin")}
                    </option>
                    <option value="user" className="text-dark">
                      {t("user")}
                    </option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-1">
                  <label className="dark:text-light opacity-60">
                    {t("phone")}:
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.phone}
                    maxLength={11}
                    className="disabled:opacity-100 text-dark dark:text-light bg-light-bg dark:bg-black-bg px-2 rounded-lg outline-none border-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  <label className="dark:text-light opacity-60">
                    {t("fullName")}:
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.fullName ? user.fullName : t("null")}
                    className="disabled:opacity-100 text-dark dark:text-light bg-light-bg dark:bg-black-bg px-2 rounded-lg outline-none border-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  <label className="dark:text-light opacity-60">
                    {t("email")}:
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.email ? user.email : t("null")}
                    className="disabled:opacity-100 text-dark dark:text-light bg-light-bg dark:bg-black-bg px-2 rounded-lg outline-none border-none"
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  <label className="dark:text-light opacity-60">
                    {t("idCard")}:
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.idCard ? user?.idCard : t("null")}
                    className="disabled:opacity-100 text-dark dark:text-light bg-light-bg dark:bg-black-bg px-2 rounded-lg outline-none border-none"
                  />
                </div>
                <div className="flex gap-1">
                  <label className="dark:text-light opacity-60">
                    {t("isActive")}:
                  </label>
                  <select
                    type="text"
                    defaultValue={user.isActive ? t("active") : t("notActive")}
                    disabled={!role === "superAdmin" && !role === "admin"}
                    className={`${
                      !user?.isActive
                        ? "text-error dark:text-error"
                        : "dark:text-light"
                    } disabled:opacity-100 text-dark bg-transparent outline-none border-none`}
                  >
                    <option value="admin" className="text-dark">
                      {t("active")}
                    </option>
                    <option value="user" className="text-dark">
                      {t("notActive")}
                    </option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <label className="dark:text-light opacity-60">
                    {t("isComplete")}:
                  </label>
                  <p
                    className={` ${
                      !user?.isComplete
                        ? "text-error dark:text-error"
                        : "dark:text-light"
                    } `}
                  >
                    {user?.isComplete ? t("complete") : t("notComplete")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-16">
                <button type="reset" className="authBtn bg-error dark:bg-error text-xl">
                  {t("reset")}
                </button>
                <button className="authBtn text-xl" onClick={() => openModal()}>
                  {t("update")}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-start p-4 text-2xl">{t("noUserFound")}</p>
        )}
      </div>
      <ConfirmationModal
        isVisible={showModal}
        onClose={closeModal}
        onConfirm={handleSubmit}
        message={t("updateUserInfo")}
      />
    </div>
  );
}
