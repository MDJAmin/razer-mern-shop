import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);
  const { userId } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4 text-lg relative w-full min-h-screen bg-light-bg dark:bg-black-bg -z-10">
      {loading ? (
        <p className="text-start p-4 text-2xl w-full h-full bg-light dark:bg-dark dark:text-light rounded-lg">
          {t("loading")}
        </p>
      ) : user ? (
        <div className="bg-light dark:bg-dark p-5 rounded-lg drop-shadow-lg">
          <h2 className="text-3xl dark:text-light mb-4">{t("userProfile")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("userId")}:
              </label>
              <p className="dark:text-light">{user?._id}</p>
            </div>
            <div className="flex gap-1">
              <label className=" opacity-60 dark:text-light">
                {t("role")}:
              </label>
              <p
                className={` ${
                  user.role === "admin"
                    ? "text-dark-green dark:text-light-green"
                    : "dark:text-light"
                }`}
              >
                {user?.role === "admin" ? t("admin") : t("user")}
              </p>
            </div>
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("phone")}:
              </label>
              <p className="dark:text-light">{user?.phone}</p>
            </div>
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("fullName")}:
              </label>
              <p className="dark:text-light">
                {user?.fullName ? user?.fullName : t("null")}
              </p>
            </div>
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("email")}:
              </label>
              <p className="dark:text-light">
                {user?.email ? user?.email : t("null")}
              </p>
            </div>
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("idCard")}:
              </label>
              <p className="dark:text-light">
                {user?.idCard ? user?.idCard : t("null")}
              </p>
            </div>
            <div className="flex gap-1">
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
            <div className="flex gap-1">
              <label className="dark:text-light opacity-60">
                {t("isActive")}:
              </label>
              <p
                className={` ${
                  !user?.isActive
                    ? "text-error dark:text-error"
                    : "dark:text-light"
                } `}
              >
                {user.isActive ? t("active") : t("notActive")}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-start p-4 text-2xl w-full h-full bg-light dark:bg-dark dark:text-light rounded-lg">
          {t("noUserFound")}
        </p>
      )}
    </div>
  );
}
