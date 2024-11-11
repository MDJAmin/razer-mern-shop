import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Context/Slices/userSlice";

export default function CheckCode({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { isPass } = useSelector((state) => state.auth);

  const [code, setCode] = useState(null);
  const [showResend, setShowResend] = useState(false);

  const dispatch = useDispatch();

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
      const data = await res.json();
      if (data.success) {
        console.log(data);
        dispatch(
          signInSuccess({
            token: data.data.token,
            currentUser: data.data.user,
            role: data.data.user.role,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setShowResend(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  setInterval(() => {
    setShowResend(true);
  }, 2 * 60 * 1000);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setCode(e.target.value)} />
        <button type="submit">Check Code</button>
      </form>
      {isPass && (
        <p onClick={() => handlePageType("CheckPass")}>
          Continue with password
        </p>
      )}
      {showResend && <p onClick={handleResendCode}>Resend Code</p>}
    </div>
  );
}
