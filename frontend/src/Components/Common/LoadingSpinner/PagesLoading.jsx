import { useState, useEffect } from "react";

export default function RGBSpinner({ type = "client" }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const updateRotation = () => {
      setRotation((prev) => (prev + 3) % 360);
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    animationFrameId = requestAnimationFrame(updateRotation);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className={`flex items-center justify-center h-screen ${
        type === "admin" ? "w-screen" : "w-100"
      } bg-white dark:bg-black text-white`}
    >
      <div className="relative w-20 h-20">
        {/* Outer spinning ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${rotation}deg, #00FF00, #D2DFD2, #646464, #00FF00)`,
            boxShadow: "0 0 15px rgba(0, 255, 0, 0.7)",
          }}
        ></div>

        {/* Inner static circle */}
        <div className="absolute inset-2 bg-white dark:bg-black rounded-full"></div>

        {/* Screen reader text for accessibility */}
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  );
}
