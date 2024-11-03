import React, { useState } from "react";

export default function CheckCode({ handlePageType }) {
  const phone = localStorage.getItem("phone");
  const [code, setCode] = useState(null);
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
      const data = res.json();
      if (data.success) {
        console.log(data);
        alert("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendCode=async()=>{
    try {
        const res = await fetch("http://localhost:5000/api/auth/send-code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
          });
          const data = res.json();
          if (data.success) {
            console.log(data);
            alert("success resend code");
          }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Check Code</button>
      </form>
      <p onClick={() => handlePageType("CheckPass")}>Continue with password</p>
     <p onClick={handleResendCode}>Resend Code</p> 
     {/*resend code must be appear after first code disabled (2m) */}
    </div>
  );
}
