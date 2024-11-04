import React, { useState } from "react";
import Identifier from "../../Components/Auth/Identifier";
import CheckCode from "../../Components/Auth/CheckCode";
import CheckPassword from "../../Components/Auth/CheckPassword";

export default function Auth() {
  const [pageType, setPageType] = useState("Identifier");
  const [phone, setPhone] = useState(null);
  const [isPass, setIsPass] = useState(false);


  
  const handlePass = (e) => {
    setIsPass(e);
  };
  const handlePageType = (e) => {
    setPageType(e);
  };
  return (
    <>
      {pageType == "Identifier" ? (
        <Identifier handlePageType={handlePageType} handlePass={handlePass} />
      ) : pageType == "checkCode" ? (
        <CheckCode handlePageType={handlePageType} isPass={isPass}  />
      ) : (
        <CheckPassword handlePageType={handlePageType} />
      )}
    </>
  );
}
