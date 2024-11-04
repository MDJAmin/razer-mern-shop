import React, { useState } from "react";
import Identifier from "../../Components/Auth/Identifier";
import CheckCode from "../../Components/Auth/CheckCode";
import CheckPassword from "../../Components/Auth/CheckPassword";

export default function Auth() {
  const [pageType, setPageType] = useState("Identifier");

  const handlePageType = (e) => {
    setPageType(e);
  };
  return (
    <>
      {pageType == "Identifier" ? (
        <Identifier handlePageType={handlePageType} />
      ) : pageType == "checkCode" ? (
        <CheckCode handlePageType={handlePageType}  />
      ) : (
        <CheckPassword handlePageType={handlePageType} />
      )}
    </>
  );
}
