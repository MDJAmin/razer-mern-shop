import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../Context/Slices/authSlice";

export default function Identifier({ handlePageType }) {
  const [identifier, setIdentifier] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth", {
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
        // localStorage.setItem("phone", data.identifier.phone);
        // localStorage.setItem("identifier", data.identifier.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
          placeholder="indentifier"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
