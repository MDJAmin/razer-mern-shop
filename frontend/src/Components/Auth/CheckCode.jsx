import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Context/Slices/userSlice";

import logoWithText from "../../Assets/logoWithText.png";

import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import CountdownTimer from "./CountDownTimer";

export default function CheckCode({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { isPass } = useSelector((state) => state.auth);

  const [code, setCode] = useState(null);
  const [showResend, setShowResend] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/check-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (data.success) {
        console.log(data);
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

  const handleResendCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setShowResend(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setInterval(() => {
    setShowResend(true);
  }, 2 * 60 * 1000);

  return (
    <div className="bg-black flex justify-center items-center w-full h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-between border-[1px] border-light-green bg-dark-green rounded-2xl py-12 px-4 md:px-0">
        <img src={logoWithText} alt="logoWithText" className="px-6 md:px-0" />

        <div className="w-full">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl mb-5 font-extralight">
              Enter verification code
            </h1>
            <p className="text-white-smoke tracking-wide text-sm mb-4">
              Verification code has been sent to{" "}
              <span className="text-light-green">{phone}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="number"
              onChange={(e) => setCode(e.target.value)}
              className="authInp hide-number-controls"
              placeholder="Enter The Code"
            />
            <div className="text-white-smoke mt-3">
              {showResend ? (
                <p>
                  <span
                    onClick={handleResendCode}
                    className="text-light-green cursor-pointer"
                  >
                    Click here
                  </span>{" "}
                  to resend code
                </p>
              ) : (
                <p className="flex gap-1">
                  Remaining to receive new code
                  <span className="text-light-green">
                    <CountdownTimer />
                  </span>
                </p>
              )}
            </div>
            <button disabled={!code} type="submit" className="authBtn mt-3">
              Confirm
            </button>
            {isPass && (
              <p
                onClick={() => handlePageType("CheckPass")}
                className="text-white-smoke mt-2 cursor-pointer hover:opacity-80 "
              >
                Continue with password
              </p>
            )}
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
