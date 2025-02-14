import React from "react";
import { GoPlusCircle } from "react-icons/go";

const data = [
  {
    name: "Razer Blade 15",
    date: "23/09/2022",
    category: "Headphone’s",
    amount: "$100",
    image:
      "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with actual URLs
    isActive: true,
  },
  {
    name: "Razer DeathAdder V3 Pro",
    date: "23/09/2022",
    category: "Keyboard’s",
    amount: "$100",
    image:
      "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
  },
  {
    name: "Razer BlackWidow V4 Pro",
    date: "23/09/2022",
    category: "Headphone’s",
    amount: "$100",
    image:
      "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: false,
  },
  {
    name: "Razer Kraken V3",
    date: "23/09/2022",
    category: "Keyboard’s",
    amount: "$100",
    image:
      "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
  },
  {
    name: "Razer Naga X",
    date: "23/09/2022",
    category: "Keyboard’s",
    amount: "$100",
    image:
      "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isActive: true,
  },
];

export default function AddProduct() {
  return (
    <div className="overflow-x-auto scrollbar-hide bar p-4 w-full text-[16px]">
      <table className="w-full border-collapse dark:bg-admin-green rounded-lg">
        <thead>
          <tr className="text-left text-dark dark:text-light text-lg">
            <td className="p-3 pr-48 py-8">Name</td>
            <td className="p-3 pr-20">Date</td>
            <td className="p-3 pr-16">Category</td>
            <td className="p-3 pr-16 whitespace-nowrap">Price</td>
            <td className="p-3 pr-12">Images</td>
            <td className="p-3 pr-8 whitespace-nowrap">Is Active</td>
            <td
              className="pr-2 text-3xl hover:text-dark-green dark:hover:text-light-green cursor-pointer duration-100"
              title="Add New Category"
            >
              <GoPlusCircle />
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-gray dark:border-light">
              <td
                className={`p-3 text-dark dark:text-light tracking-wider ${
                  !item.isActive && "line-through"
                }`}
              >
                {item.name}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light  dark:opacity-80">
                {item.date}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                {item.category}
              </td>
              <td className="p-3 text-gray opacity-60 dark:text-light dark:opacity-80">
                {item.amount}
              </td>
              <td className="p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-md"
                />
              </td>
              <td
                className={`p-3 tracking-wide whitespace-nowrap ${
                  item.isActive
                    ? "text-gray opacity-60 dark:text-light dark:opacity-80"
                    : "text-error"
                }`}
              >
                {item.isActive ? "Active" : "Not Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
