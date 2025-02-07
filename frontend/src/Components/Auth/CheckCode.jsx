import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Context/Slices/userSlice";

import logoWithText from "../../Assets/logoWithText.png";

import { AiOutlineYoutube } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CheckCode({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { isPass } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.user);

  const [code, setCode] = useState(null);
  const [showResend, setShowResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const dispatch = useDispatch();

  useEffect(() => {
    if (timeLeft <= 0) {
      setShowResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/api/auth/check-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, code }),
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
      } else {
        const messages = JSON.parse(data.message);
        dispatch(signInFailure(messages.en));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("somthing went wrong"));
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
        setTimeLeft(120);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black flex justify-center items-center w-full h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-between border-[1px] border-light-green bg-dark-green rounded-2xl py-8 px-4 md:px-0">
        <img src={logoWithText} alt="logoWithText" className="px-6 md:px-0" />

        <div className="w-full">
          <div className="text-center text-white relative">
            <h1 className="text-3xl sm:text-4xl mb-5 font-extralight">
              Enter verification code
            </h1>
            <p className="text-white-smoke tracking-wide text-sm mb-4">
              Verification code has been sent to{" "}
              <span
                className="text-light-green hover:text-red-500 cursor-pointer duration-150"
                onClick={() => handlePageType("identifier")}
              >
                {phone}
              </span>
            </p>
            <div
              className="absolute -top-[107px] left-10 text-2xl text-light-green border-2 border-opacity-20 hover:border-opacity-80 cursor-pointer duration-150 rounded-full border-white-smoke p-2"
              onClick={() => handlePageType("identifier")}
            >
              <FaArrowLeftLong />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center relative"
          >
            <input
              type="number"
              onChange={(e) => setCode(e.target.value)}
              className="authInp hide-number-controls"
              placeholder="Enter The Code"
            />
            {error && (
              <p className="text-red-600 absolute top-[60px] left-[115px] text-sm">
                " {error} "
              </p>
            )}
            <div className="text-white-smoke mt-3">
              {showResend ? (
                <p className="mt-4">
                  <span
                    onClick={handleResendCode}
                    className="text-light-green cursor-pointer"
                  >
                    Click here
                  </span>{" "}
                  to resend code
                </p>
              ) : (
                <p className="flex gap-1 mt-4">
                  Remaining to receive new code
                  <span className="text-light-green w-12">
                    {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </p>
              )}
            </div>
            <button
              disabled={!code || loading}
              type="submit"
              className="authBtn mt-2"
            >
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
