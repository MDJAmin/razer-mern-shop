import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Context/Slices/userSlice";

import logoWithText from "../../Assets/logoWithText.png";

import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";

export default function CheckPassword({ handlePageType }) {
  //   const phone = localStorage.getItem("phone");
  const { phone } = useSelector((state) => state.auth.identifier);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: phone, password }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(
          signInSuccess({
            token: data.data.token,
            currentUser: data.data.user,
            role: data.data.user.role,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-black flex justify-center items-center w-full h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-between border-[1px] border-light-green bg-dark-green rounded-2xl py-12 px-4 md:px-0">
        <img src={logoWithText} alt="logoWithText" className="px-6 md:px-0" />

        <div className="w-full">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl mb-5 font-extralight">
              Welcome Back!
            </h1>
            <p className="text-white-smoke tracking-wide text-sm mb-4">
              Please enter your{" "}
              <span className="text-light-green">Password</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="authInp"
            />
            <button type="submit" className="authBtn">
              Confirm
            </button>
            <p className="text-white-smoke mt-2">
              Forget Your Password?{" "}
              <span
                onClick={() => handlePageType("checkCode")}
                className="text-light-green cursor-pointer"
              >
                Send Code
              </span>
            </p>
          </form>
        </div>
        <div className="text-center text-white">
          <p>Razer | All Rights Reserved</p>
          <div className="flex justify-center items-center mt-2 text-3xl gap-1">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="hover:opacity-60 duration-100"
            >
              <AiOutlineYoutube className="text-[40px]" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="hover:opacity-60 duration-100"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.x.com/"
              target="_blank"
              className="hover:opacity-60 duration-100"
            >
              <RiTwitterXFill />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
