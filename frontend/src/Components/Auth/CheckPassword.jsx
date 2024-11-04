import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../Context/Slices/userSlice";

export default function CheckPassword({ handlePageType }) {
  const phone = localStorage.getItem("phone");
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          signInSuccess({ token: data.data.token, currentUser: data.data.user })
        );
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
