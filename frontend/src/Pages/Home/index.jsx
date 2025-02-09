import React from 'react'
import ThemeToggle from '../../Components/Common/Button/ThemeToggle'

export default function Home() {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <>
    <ThemeToggle/> 
    <div className='text-3xl underline bg-light dark:bg-dark text-light dark:text-white'>Home</div>
    </>
  )
}
