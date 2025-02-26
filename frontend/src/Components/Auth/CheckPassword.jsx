import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../Context/Slices/userSlice";
import { useTranslation } from "react-i18next";

export default function CheckPassword({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { error, loading } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const [password, setPassword] = useState(null);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}auth/check-password`, {
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
            id: data.data.user.id,
          })
        );
        navigate("/");
      } else {
        const messages = JSON.parse(data.message);
        dispatch(signInFailure(messages[lang]));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure("something went wrong"));
    }
  };
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl mb-5 font-extralight text-gray dark:text-light">
          {t("welcomeBack")}
        </h1>
        <p className="text-dark dark:text-placeHolder tracking-wide text-sm mb-4">
          {t("pleaseEnterYour")} <span className="text-info-green">{t("password")}</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center relative"
      >
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("enterYourPassword")}
          className="authInp"
        />
        <div className={`min-h-6 text-start w-full ${lang === "en"? "ml-5": "mr-5"}`}>
          {error && (
            <p className="text-error tracking-wide text-sm mt-1">" {error} "</p>
          )}
        </div>
        <button
          disabled={!password || loading}
          type="submit"
          className="authBtn"
        >
          {t("confirm")}
        </button>
        <p className="text-dark dark:text-placeHolder mt-2">
          {t("forgetYourPassword")}{" "}
          <span
            onClick={() => handlePageType("checkCode")}
            className="text-info-green hover:opacity-80 cursor-pointer"
          >
            {t("sendCode")}
          </span>
        </p>
      </form>
    </>
  );
}
