import React, { useEffect } from 'react';
import { Home, Auth, Category, ProductDetails } from "../src/Constants";
import gsap from "gsap";

export default function App() {

  useEffect(()=>{
    gsap.fromTo(
      ".app-title",
      {opacity:0, y:-50,duration:1},
      {opacity:1,y:0,}
    )
  },[])
  
  return (
    <>
      <div className="app-title">App</div>
      <Home />
      <Auth />
      <Category />
      <ProductDetails />
    </>
  );
}
``