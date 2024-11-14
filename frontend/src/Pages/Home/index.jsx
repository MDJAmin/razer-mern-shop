import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <div className='home-container'>
      <h1>Welcome to Home Page</h1>
      <p>This is the home page content.</p>
      <button>
        <Link to={"/auth"}>Login</Link>
      </button>
    </div>
  );
}
