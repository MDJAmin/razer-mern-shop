import React, { useState } from "react";

export default function Identifier({ handlePageType }) {
  const [identifier, setIdentifier] = useState("");

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
        console.log(data)
        localStorage.setItem('phone', data.data.phone)
        localStorage.setItem('identifier', data.data.identifier)
        handlePageType('checkCode')
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
