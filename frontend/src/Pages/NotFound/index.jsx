import React from "react";
import { useNavigate } from "react-router-dom";


export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-black flex justify-center items-center w-full h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-center border-[1px] border-light-green bg-soft-green dark:bg-dark-green rounded-2xl py-8 px-4 md:px-0 ">
        <div className="w-full px-0 sm:px-24">
          <div className="text-center">
            <h1 className="text-6xl sm:text-7xl mb-5 font-extralight text-gray dark:text-white">
              404!
            </h1>
            <p className="text-lg sm:text-xl text-gray dark:text-white-smoke tracking-wide mb-4">
              Oops! The page you are looking for does not exist.
            </p>
            <p className="text-sm sm:text-base text-gray dark:text-white-smoke mb-6">
              It seems like you've followed a broken link or typed the wrong URL.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="authBtn w-3/4 sm:w-2/3 py-2 text-lg sm:text-xl md:text-2xl hover:bg-red-500 "
            >
              Go Back to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="authBtn w-3/4 sm:w-2/3 text-lg sm:text-xl md:text-2xl  py-2 px-4  hover:bg-red-500 "
            >
              Go Back to Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
