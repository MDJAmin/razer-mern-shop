import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Context/Slices/userSlice";

export default function CheckCode({ handlePageType }) {
  const { phone } = useSelector((state) => state.auth.identifier);
  const { isPass } = useSelector((state) => state.auth);

  const [code, setCode] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
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
        dispatch(
          signInSuccess({
            token: data.data.token,
            currentUser: data.data.user,
            role: data.data.user.role,
          })
        );
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (loading) return;
    setLoading(true);
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
        setTimer(setTimeout(() => setShowResend(true), 2 * 60 * 1000));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Code"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {isPass && (
        <p onClick={() => handlePageType("CheckPass")}>
          Continue with password
        </p>
      )}
      {showResend && (
        <p onClick={handleResendCode}>
          {loading ? "Resending..." : "Resend Code"}
        </p>
      )}
    </div>
  );
}