import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Search from "../../Components/Admin/Search";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { token } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.user.currentUser);
  const { lang } = useSelector((state) => state.i18n);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let adminData = [];

        if (role === "superAdmin") {
          const res = await fetch(`${baseUrl}user/admin`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const admins = await res.json();
          if (admins.success) {
            adminData = admins.data;
          }
        }

        const res = await fetch(`${baseUrl}user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const users = await res.json();
        if (users.success) {
          setData([...adminData, ...users.data]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [token, role]);

  const filteredData = data.filter(
    (user) =>
      user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery.toLowerCase()) ||
      user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.idCard?.includes(searchQuery.toLowerCase())
  );

  const changeRole = async (userId, newRole) => {
    try {
      const res = await fetch(`${baseUrl}user/change-role/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const result = await res.json();
      if (result.success) {
        setData((prevData) =>
          prevData.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
      } else {
        console.log("Failed to change role.");
      }
    } catch (err) {
      console.error("Error changing role:", err);
    }
    setModalVisible(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <div className="scrollbar-hide overflow-x-auto p-4 w-full text-[16px] relative">
      <Search
        placeholder={t("searchForUser")}
        searchQuery={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
      />

      {/* Modal for role change confirmation */}
      {modalVisible && selectedUser && (
        <div className="fixed inset-0 px-2 bg-light dark:bg-dark dark:bg-opacity-60 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-light-bg dark:bg-black-bg p-5 rounded-lg drop-shadow-lg">
            <h3 className="text-xl dark:text-light tracking-wide flex flex-col">
              <span className="mb-2">
                {t("changeRoleForThisUserTo")}{" "}
                <span className="text-info-green">
                  {selectedUser.role === "admin" ? t("user") : t("admin")}
                  {lang == "en" ? "?" : "؟"}
                </span>
              </span>
              <span className="opacity-70 text-[16px]">
                {t("id")}: {selectedUser._id}
              </span>
              <span className="opacity-70 text-[16px]">
                {t("phone")}: {selectedUser?.phone}
              </span>
              <span className="opacity-70 tracking-wider text-[16px] ">
                {t("fullName")}: {selectedUser?.fullName}
              </span>
              <span className="opacity-70 text-[16px]">
                {t("idCard")}: {selectedUser?.idCard}
              </span>
            </h3>
            <div className="mt-4 flex justify-center gap-2">
              <button
                className="authBtn bg-error dark:bg-error"
                onClick={() => setModalVisible(false)}
              >
                {t("cancel")}
              </button>
              <button
                className="authBtn"
                onClick={() =>
                  changeRole(
                    selectedUser._id,
                    selectedUser.role === "admin" ? "user" : "admin"
                  )
                }
              >
                {t("change")}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
          <thead>
            <tr
              className={`${
                lang == "en" ? "text-left" : "text-right"
              } text-dark dark:text-light text-lg border-b`}
            >
              <td className="p-3 py-6 whitespace-nowrap">{t("userId")}</td>
              <td className="p-3 whitespace-nowrap">{t("role")}</td>
              <td className="p-3 whitespace-nowrap">{t("fullName")}</td>
              <td className="p-3">{t("email")}</td>
              <td className="p-3 whitespace-nowrap">{t("idCard")}</td>
              <td className="p-3 whitespace-nowrap">{t("phone")}</td>
              <td className="p-3 whitespace-nowrap">{t("complete")}</td>
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
            ) : filteredData.length === 0 ? (
              <tr>
                <td className="text-start px-3 text-xl dark:text-light py-10 whitespace-nowrap ">
                  {t("noUserFound")}
                </td>
              </tr>
            ) : (
              filteredData?.map((user, index) => (
                <tr
                  key={index}
                  className="border-t border-gray dark:border-light hover:opacity-80"
                >
                  <td
                    className="p-3 text-dark dark:text-light cursor-pointer hover:underline flex items-center gap-2 relative"
                    onClick={() => navigate(`/profile/${user?._id}`)}
                    title={t("clickToSeeProfile")}
                  >
                    {user._id?.slice(0, 8)}...
                  </td>
                  <td
                    className={`p-3 text-dark opacity-90 dark:text-light tracking-wide cursor-pointer hover:underline ${
                      user?.role === "admin" &&
                      "text-dark-green dark:text-light-green"
                    }`}
                    title={t("clickToChangeRole")}
                    onClick={() => openModal(user)}
                  >
                    {user.role
                      ? user.role == "admin"
                        ? t("admin")
                        : t("user")
                      : t("null")}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                    {user.fullName ? user.fullName : t("null")}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                    {user.email ? user.email : t("null")}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                    {user.idCard ? user.idCard : t("null")}
                  </td>
                  <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                    {user.phone ? user.phone : t("null")}
                  </td>
                  <td
                    className={`p-3 tracking-wide whitespace-nowrap ${
                      user.isComplete
                        ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                        : "text-error"
                    }`}
                  >
                    {user.isComplete ? t("complete") : t("notComplete")}
                  </td>
                  <td
                    className={`p-3 tracking-wide whitespace-nowrap ${
                      user.isActive
                        ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                        : "text-error"
                    }`}
                  >
                    {user?.isActive ? t("active") : t("notActive")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
