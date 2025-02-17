import React, { useEffect, useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../Components/Admin/ConfirmationModal";

export default function AddProduct() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productIdToToggle, setProductIdToToggle] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const { token } = useSelector((state) => state.user);

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
        console.log(data.data);
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
    <div className="overflow-x-auto scrollbar-hide bar p-4 w-full text-[16px]">
      <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
        <thead>
          <tr className="text-left text-dark dark:text-light text-lg border-b">
            <td className="p-3 py-8">Name</td>
            <td className="p-3 ">Date</td>
            <td className="p-3 ">Category</td>
            <td className="p-3 pr-8">Price</td>
            <td className="p-3 pr-8">Images</td>
            <td className="p-3 pr-8 whitespace-nowrap">Is Active</td>
            <td
              className="pr-4 text-3xl hover:text-dark-green dark:hover:text-light-green cursor-pointer duration-100"
              title="Add New Product"
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
                <td className="p-3 text-dark dark:text-light tracking-wider whitespace-nowrap pr-10">
                  {item?.name.en}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 pr-4">
                  {new Date(item?.updatedAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80 whitespace-nowrap pr-4">
                  {item?.categoryId?.title.en}
                </td>
                <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                  {item.price ? item.price : "Null"}
                </td>
                <td className="p-3">
                  <img
                    src={item?.images[0]}
                    alt={item?.name.en}
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
              Change status to <span className="text-error">Not Active</span>
            </span>
          ) : (
            <span>
              Change status to <span className="text-dark-green">Active</span>
            </span>
          )
        }
      />
    </div>
  );
}
