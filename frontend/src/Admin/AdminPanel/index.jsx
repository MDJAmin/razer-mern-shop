import React from "react";
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import CurrentDate from "../../Components/Common/Date";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaChartLine } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { BsBagCheck } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
);

ChartJS.overrides.radar.color="#FFFFFF"

export default function AdminPanel() {
  const { t } = useTranslation();
  const { email, phone } = useSelector((state) => state.user.currentUser);
  const shortMail = email?.split("@")[0];

  const { theme } = useSelector((state) => state.theme);

  const options = {
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#FFFFFF" : "#000000",
        },
        grid: {
          color: theme === "dark" ? "#acadac5b" : "#ACADAC",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#FFFFFF" : "#2C2C2C",
        },
        grid: {
          color: theme === "dark" ? "#acadac5b" : "#ACADAC",
        },
      },
    },
  };

  const containerClass =
    "bg-admin-gray dark:bg-admin-green text-dark dark:text-light rounded-lg";
  const gridItem1Class =
    "col-span-12 md:col-span-12 lg:col-span-9 xl:col-span-5";
  const gridItem2Class =
    "col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-2";

  const barData = {
    labels: [
      "DeathAdder",
      "BlackWidow",
      "Basilisk",
      "Iskur",
      "Blade 16",
      "Leviathan",
      "Seiren",
      "Kiyo Pro",
      "Wolverine",
      "Huntsman Mini",
    ],
    datasets: [
      {
        label: "Best Products Based On Sales",
        data: [9, 19, 5, 7, 15, 10, 12, 6, 8, 18],
        backgroundColor: "#0099ff",
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: ["Income", "Expenses", "Sale", "Profit"],
    datasets: [
      {
        data: [40, 60, 30, 20],
        backgroundColor: ["#219ebc", "#588157", "#0077b6", "#778da9"],
        borderColor: theme === "dark" ? "#0F5229" : "#DDDDDD",
      },
    ],
  };

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "The Course Of Growth",
        data: [15, 5, 10, 15, 20, 30, 35, 30, 45, 40, 60, 65],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const lineDataSec = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Customer",
        data: [35, 40, 30, 25, 50, 80, 70, 30, 60, 45, 70, 90],
        borderColor: "#38b17b",
        tension: 0.3,
      },
      {
        label: "Shopkeeper",
        data: [75, 50, 70, 75, 20, 30, 30, 80, 20, 25, 40, 30],
        borderColor: "#dd7ccc",
        tension: 0.3,
      },
    ],
  };

  const radarData = {
    labels: [
      "Online",
      "Store",
      "Order",
      "Shopping",
      "Delivery",
      "Purchase",
      "Tips",
    ],
    datasets: [
      {
        label: "Eranings",
        data: [65, 59, 90, 81, 56, 55, 40],
        borderColor: "#0a9396",
      },
      {
        label: "Tax",
        data: [28, 48, 40, 19, 96, 27, 100],
        borderColor: "#9d8189",
      },
    ],
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full px-6 py-4 pb-12">
      <div className="bg-admin-gray dark:bg-admin-green py-4 px-6 flex flex-wrap gap-x-12 justify-between w-full text-xl rounded-lg">
        <h2 className="text-xl sm:text-2xl text-dark dark:text-light">
          {t("welcomeDear")} "{email ? shortMail : phone}"
        </h2>
        <CurrentDate />
      </div>
      <div className="grid grid-cols-12 gap-2 w-full">
        <div className={`${gridItem1Class} ${containerClass}`}>
          <div className="flex flex-col justify-start items-start gap-8 p-6">
            <div className="flex flex-col gap-1 items-start">
              <h3 className="text-xl">Today's Sales</h3>
              <p className="opacity-40 text-sm">Sales Summary</p>
            </div>

            <div className="flex w-full flex-wrap gap-1 justify-between items-center">
              <div className="flex flex-col gap-1 items-start text-dark dark:text-light bg-light-bg dark:bg-black-bg rounded-xl py-4 px-6">
                <p className="text-amber-400 text-4xl mb-2">
                  <FaChartLine />
                </p>
                <p className="text-2xl">$5K</p>
                <p className="text-[16px]">Total Sales</p>
                <p className="text-amber-400 text-xs">+10% from yesterday</p>
              </div>
              <div className="flex flex-col gap-1 items-start text-dark dark:text-light bg-light-bg dark:bg-black-bg rounded-xl py-4 px-6">
                <p className="text-cyan-600 text-4xl mb-2">
                  <LuClipboardCheck />
                </p>
                <p className="text-2xl">500</p>
                <p className="text-[16px]">Total Order</p>
                <p className="text-cyan-600 text-xs">+8% from yesterday</p>
              </div>
              <div className="flex flex-col gap-1 items-start text-dark dark:text-light bg-light-bg dark:bg-black-bg rounded-xl py-4 px-6">
                <p className="text-purple-300 text-4xl mb-2">
                  <BsBagCheck />
                </p>
                <p className="text-2xl">19</p>
                <p className="text-[16px]">Product Sold</p>
                <p className="text-purple-300 text-xs">+2% from yesterday</p>
              </div>
              <div className="flex flex-col gap-1 items-start text-dark dark:text-light bg-light-bg dark:bg-black-bg rounded-xl py-4 px-6">
                <p className="text-lime-400 text-4xl mb-2">
                  <FiUserPlus />
                </p>
                <p className="text-2xl">24</p>
                <p className="text-[16px]">New Customer</p>
                <p className="text-lime-400 text-xs">+3% from yesterday</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${gridItem2Class} ${containerClass} p-2 flex flex-col justify-evenly items-center`}
        >
          <h2 className="text-start w-full text-xl px-2">Levels:</h2>
          <Radar
            data={radarData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: theme === "dark" ? "#FFFFFF" : "#000000",
                  },
                },
              },
              
            }}
          />
        </div>
        <div
          className={`${gridItem1Class} ${containerClass} p-4 flex flex-col justify-center items-center`}
        >
          <h2 className="text-start w-full text-xl p-2 pb-0">Top Products:</h2>
          <Bar data={barData} options={options} />
        </div>
        <div
          className={`${gridItem1Class} ${containerClass} p-4 flex flex-col justify-center items-center`}
        >
          <h2 className="text-start w-full text-xl p-2 pb-0">
            Customer Fulfilment:
          </h2>
          <Line data={lineDataSec} options={options} />
        </div>
        <div
          className={`${gridItem2Class} ${containerClass} p-2 flex flex-col justify-evenly items-center`}
        >
          <h2 className="text-start w-full text-xl px-2">
            Yearly Information:
          </h2>
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: theme === "dark" ? "#FFFFFF" : "#000000",
                    borderColor: "#000000",
                  },
                },
              },
            }}
          />
        </div>
        <div
          className={`${gridItem1Class} ${containerClass} p-4 flex justify-center items-center`}
        >
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
}
