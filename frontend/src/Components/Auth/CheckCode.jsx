import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Context/Slices/userSlice";

export default function CheckCode({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { isPass } = useSelector((state) => state.auth);
  const { error, loading } = useSelector((state) => state.user);

  const [code, setCode] = useState(null);
  const [showResend, setShowResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

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
      const res = await fetch(`${baseUrl}auth/check-code`, {
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
        navigate("/");
      } else {
        const messages = JSON.parse(data.message);
        dispatch(signInFailure(messages.en));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("Something went wrong"));
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await fetch(`${baseUrl}auth/send-code`, {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl mb-5 font-extralight text-gray dark:text-light">
          Enter verification code
        </h1>
        <p className="text-dark dark:text-placeHolder tracking-wide text-sm mb-4">
          Verification code has been sent to{" "}
          <span
            className="text-info-green hover:text-error cursor-pointer duration-200"
            onClick={() => handlePageType("identifier")}
          >
            {phone}
          </span>
        </p>
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
        <div className="min-h-6 text-start w-full ml-5">
          {error && (
            <p className="text-error tracking-wide text-sm mt-1">" {error} "</p>
          )}
        </div>
        <div className="text-dark dark:text-placeHolder mt-1">
          {showResend ? (
            <p>
              <span
                onClick={handleResendCode}
                className="text-info-green cursor-pointer"
              >
                Click here
              </span>{" "}
              to resend code
            </p>
          ) : (
            <p className="flex gap-1">
              Remaining to receive new code
              <span className="text-info-green w-12">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            </p>
          )}
        </div>
        <div className="w-full flex gap-1">
          <button
            disabled={!code || loading}
            type="submit"
            className="authBtn mt-2 rounded-tr-none rounded-br-none"
          >
            Confirm
          </button>
          <button
            className="authBtn w-1/5 rounded-tl-none rounded-bl-none flex justify-center items-center hover:bg-error"
            onClick={() => handlePageType("identifier")}
          >
            <RiArrowGoBackFill />
          </button>
        </div>
        {isPass && (
          <p
            onClick={() => handlePageType("CheckPass")}
            className="text-dark dark:text-placeHolder mt-2 cursor-pointer hover:opacity-85 dark:hover:opacity-85"
          >
            Continue with password
          </p>
        )}
      </form>
    </>
  );
}
