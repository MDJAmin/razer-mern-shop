import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Context/Slices/authSlice";

import logoWithText from "../../Assets/logoWithText.png";

import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import {
  signInFailure,
  signInStart,
  signInWaiting,
} from "../../Context/Slices/userSlice";

export default function Identifier({ handlePageType }) {
  const [identifier, setIdentifier] = useState("");
  const { error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier }),
      });
      const data = await res.json();
      if (data.success) {
        handlePageType("checkCode");
        dispatch(
          auth({
            isNew: data.isNew,
            isPass: data.isPass,
            identifier: data.identifier,
          })
        );
        dispatch(signInWaiting());
      } else {
        dispatch(signInFailure(data.message.en));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("somthing went wrong"));
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
              Please enter your <span className="text-light-green">email</span>{" "}
              or <span className="text-light-green">phone number</span>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center relative"
          >
            <input
              type="text"
              onChange={(e) => {
                setIdentifier(e.target.value);
              }}
              placeholder="Email or Phone number"
              className="authInp"
            />
            {error && (
              <p className="text-red-600 absolute top-[60px] left-[115px] text-sm">
                " {error} "
              </p>
            )}
            <button
              disabled={!identifier || loading}
              type="submit"
              className="authBtn"
            >
              Sign In
            </button>
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
