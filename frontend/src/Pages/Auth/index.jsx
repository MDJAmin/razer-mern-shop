import React, { useState } from "react";
import Identifier from "../../Components/Auth/Identifier";
import CheckCode from "../../Components/Auth/CheckCode";
import CheckPassword from "../../Components/Auth/CheckPassword";
import AuthHeader from "../../Components/Auth/AuthHeader";
import AuthFooter from "../../Components/Auth/AuthFooter";

export default function Auth() {
  const [pageType, setPageType] = useState("identifier");

  const handlePageType = (e) => {
    setPageType(e);
  };
  return (
    <div className="bg-light-bg dark:bg-black-bg flex justify-center items-center w-full min-h-screen px-4 md:px-0">
      <div className="w-[650px] h-[600px] flex flex-col items-center justify-between border-[1px] border-light-green bg-light dark:bg-dark-green dark:bg-opacity-5 rounded-2xl py-12 px-4 md:px-0">
        <AuthHeader />
        <div className="w-full px-0 sm:px-24">
          {pageType === "identifier" ? (
            <Identifier handlePageType={handlePageType} />
          ) : pageType === "checkCode" ? (
            <CheckCode handlePageType={handlePageType} />
          ) : (
            <CheckPassword handlePageType={handlePageType} />
          )}
        </div>
        <AuthFooter />
      </div>
    </div>
  );
}
