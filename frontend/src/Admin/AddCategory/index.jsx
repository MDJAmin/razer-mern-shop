import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";

export default function AddCategory() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryIdToToggle, setCategoryIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const { token } = useSelector((state) => state.user);

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
          <tr className="text-left text-dark dark:text-light text-lg border-b select-none">
            <td className="p-3 py-8">Name</td>
            <td className="p-3 whitespace-nowrap">Sub Category</td>
            <td className="p-3 pr-8">Images</td>
            <td className="p-3 whitespace-nowrap pr-8">Is Active</td>
            <td
              className="pr-4 text-3xl hover:text-dark-green dark:hover:text-light-green cursor-pointer duration-100"
              title="Add New Category"
            >
              <GoPlusCircle />
            </td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="text-start pl-3 text-xl dark:text-light py-10">
                Loading...
              </td>
            </tr>
          ) : (
            data?.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray dark:border-light hover:opacity-80 select-none"
              >
                <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap pr-6">
                  {item?.title?.en}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap pr-12">
                  {item?.subCategory?.title?.en}
                </td>
                <td className="p-3">
                  <img
                    src={item?.images[0]}
                    alt={item?.title.en}
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
                  {item?.isActive ? "Active" : "Not Active"}
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
              change status to <span className="text-error">Not Active</span>
            </span>
          ) : (
            <span>
              change status to <span className="text-dark-green">Active</span>
            </span>
          )
        }
      />
    </div>
  );
}
