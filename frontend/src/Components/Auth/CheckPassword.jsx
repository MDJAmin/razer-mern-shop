import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthFooter from "./AuthFooter";
import AuthHeader from "./AuthHeader";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Context/Slices/userSlice";

export default function CheckPassword({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { error, loading } = useSelector((state) => state.user);

  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
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
        navigate("/")
      } else {
        const messages = JSON.parse(data.message);
        dispatch(signInFailure(messages.en));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("something went wrong"));
    }
  };
  return (
    <div className="bg-white dark:bg-black flex justify-center items-center w-full h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-between border-[1px] border-light-green bg-soft-green dark:bg-dark-green rounded-2xl py-12 px-4 md:px-0">
        <AuthHeader />
        <div className="w-full px-0 sm:px-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl mb-5 font-extralight text-gray dark:text-white">
              Welcome Back!
            </h1>
            <p className="text-gray dark:text-white-smoke tracking-wide text-sm mb-4">
              Please enter your{" "}
              <span className="text-light-green">Password</span>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center relative"
          >
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="authInp"
            />
            <div className="min-h-6 text-start w-full ml-5">
              {error && (
                <p className="text-red-600 text-sm mt-1">" {error} "</p>
              )}
            </div>
            <button
              disabled={!password || loading}
              type="submit"
              className="authBtn"
            >
              Confirm
            </button>
            <p className="text-gray dark:text-white-smoke mt-2">
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
        <AuthFooter />
      </div>
    </div>
  );
}
