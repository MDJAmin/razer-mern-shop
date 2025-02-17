import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Users() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { token } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.user.currentUser);

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

  const copyToClipboard = async (userId) => {
    try {
      await navigator.clipboard.writeText(userId);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
    <div className="overflow-x-auto scrollbar-hide p-4 w-full text-[16px] relative">
      <form className="mb-2 relative">
        <input
          type="text"
          className="authInp text-lg py-2 "
          placeholder="Search For User:"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <span
            className="top-1 right-4 text-4xl dark:text-light rotate-45 absolute hover:opacity-80 cursor-pointer"
            onClick={() => setSearchQuery("")}
          >
            +
          </span>
        )}
      </form>

      {/* Modal for role change confirmation */}
      {modalVisible && selectedUser && (
        <div className="fixed inset-0 px-2 bg-light dark:bg-dark dark:bg-opacity-60 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-light-bg dark:bg-black-bg p-5 rounded-lg drop-shadow-lg">
            <h3 className="text-xl dark:text-light tracking-wide flex flex-col">
              <span className="mb-2">
                Change role for this user to{" "}
                <span className="text-info-green">
                  {selectedUser.role === "admin" ? "User" : "Admin"}?
                </span>
              </span>
              <span className="opacity-70 text-[16px]">
                Id: {selectedUser._id}
              </span>
              <span className="opacity-70 text-[16px]">
                Phone: {selectedUser?.phone}
              </span>
              <span className="opacity-70 tracking-wider text-[16px]">
                Name: {selectedUser?.fullName}
              </span>
              <span className="opacity-70 text-[16px]">
                Id Card: {selectedUser?.idCard}
              </span>
            </h3>
            <div className="mt-4 flex justify-center gap-2">
              <button
                className="authBtn bg-error dark:bg-error"
                onClick={() => setModalVisible(false)}
              >
                Cancel
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
                Change
              </button>
            </div>
          </div>
        </div>
      )}

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
        <tbody>
          {loading ? (
            <tr>
              <td className="text-start pl-3 text-xl dark:text-light py-10">
                Loading...
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td className="text-start pl-3 text-xl dark:text-light py-10 whitespace-nowrap ">
                No Users found!
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
                  title="Click to change role"
                  onClick={() => openModal(user)}
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
