import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let adminData = [];

        if (role === "superAdmin") {
          const res = await fetch("http://localhost:5000/api/user/admin", {
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

        const res = await fetch("http://localhost:5000/api/user", {
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

  const copyToClipboard = async (userId) => {
    try {
      await navigator.clipboard.writeText(userId);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filteredData = data.filter((user) =>
    user._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto scrollbar-hide p-4 w-full text-[16px] relative">
        <p>{t("Hi")}</p>
      <form className="mb-2 ">
        <input
          type="text"
          className="authInp text-lg py-2"
          placeholder="Search For User: UserId"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
        <thead>
          <tr className="text-left text-dark dark:text-light text-lg border-b">
            <td className="p-3 py-6 whitespace-nowrap">User ID</td>
            <td className="p-3 whitespace-nowrap">Role</td>
            <td className="p-3 whitespace-nowrap">Full Name</td>
            <td className="p-3">Email</td>
            <td className="p-3 whitespace-nowrap">ID Card</td>
            <td className="p-3">Phone</td>
            <td className="p-3">Complete</td>
            <td className="p-3 whitespace-nowrap">Is Active</td>
          </tr>
        </thead>
        {loading ? (
          <td className="flex justify-start pl-3 text-xl dark:text-light py-10">
            Loading...
          </td>
        ) : filteredData.length === 0 ? (
          <td className="flex justify-start pl-3 text-xl dark:text-light py-10 whitespace-nowrap ">
            No Users found!
          </td>
        ) : (
          <tbody>
            {filteredData?.map((user, index) => (
              <tr
                key={index}
                className="border-t border-gray dark:border-light hover:opacity-80"
              >
                <td
                  className="p-3 text-dark dark:text-light cursor-pointer hover:underline flex items-center gap-2 relative"
                  onClick={() => copyToClipboard(user._id)}
                  title="Click to copy"
                >
                  {user._id?.slice(0, 8)}...
                </td>
                <td
                  className={`p-3 text-dark opacity-90 dark:text-light tracking-wide cursor-pointer hover:underline ${
                    user?.role === "admin" &&
                    "text-dark-green dark:text-light-green"
                  }`}
                  title="Change Role"
                >
                  {user.role ? user.role : "Null"}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                  {user.fullName ? user.fullName : "Null"}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap">
                  {user.email ? user.email : "Null"}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                  {user.idCard ? user.idCard : "Null"}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                  {user.phone ? user.phone : "Null"}
                </td>
                <td
                  className={`p-3 tracking-wide whitespace-nowrap ${
                    user.isComplete
                      ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                      : "text-error"
                  }`}
                >
                  {user.isComplete ? "Complete" : "Not Complete"}
                </td>
                <td
                  className={`p-3 tracking-wide whitespace-nowrap ${
                    user.isActive
                      ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                      : "text-error"
                  }`}
                >
                  {user.isActive ? "Active" : "Not Active"}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
