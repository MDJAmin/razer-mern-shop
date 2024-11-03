import React, { useState } from "react";

export default function CheckPassword({ handlePageType }) {
  const identifier = localStorage.getItem("identifier");
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Check password</button>
      </form>
      <p onClick={() => handlePageType("checkCode")}>Continue with otp</p>
    </div>
  );
}
