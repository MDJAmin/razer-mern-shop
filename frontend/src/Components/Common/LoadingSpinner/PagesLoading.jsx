import { useState, useEffect } from "react";

export default function RGBSpinner() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 3) % 360);
    }, 16);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-dark-green text-white">
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${rotation}deg, #00FF00, #D2DFD2, #646464, #00FF00)`,
            boxShadow: "0 0 25px rgba(0, 255, 0, 0.5)",
          }}
        ></div>
        <div className="absolute inset-2 bg-dark-green rounded-full"></div>
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  );
}
