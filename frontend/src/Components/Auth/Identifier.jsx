import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../Context/Slices/authSlice";
import {
  signInFailure,
  signInStart,
  signInWaiting,
} from "../../Context/Slices/userSlice";
import { useTranslation } from "react-i18next";

export default function Identifier({ handlePageType }) {
  const [identifier, setIdentifier] = useState("");
  const { t } = useTranslation();
  const { error, loading } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.i18n);

  const dispatch = useDispatch();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}auth`, {
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
        dispatch(signInFailure(data.message[lang]));
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(t(someThingWentWrong)));
    }
  };
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl mb-5 font-extralight text-gray dark:text-light">
          {t("welcomeBack")}
        </h1>
        <p className="text-dark dark:text-placeHolder tracking-wide text-sm mb-4">
          {t("PleaseEnterYour")}
          <span className="text-info-green"> {t("email")}</span> {t("or")}{" "}
          <span className="text-info-green">{t("phoneNumber")}</span>
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
          placeholder={t("emailOrPhoneNumber")}
          className="authInp"
        />
        <div
          className={`min-h-6 text-start w-full ${
            lang === "en" ? "ml-5" : "mr-5"
          }`}
        >
          {error && (
            <p className="text-error tracking-wide text-sm mt-1">" {error} "</p>
          )}
        </div>
        <button
          disabled={!identifier || loading}
          type="submit"
          className="authBtn"
        >
          {t("signIn")}
        </button>
      </form>
    </>
  );
}
