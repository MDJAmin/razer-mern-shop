import { useState, useEffect } from 'react'

export default function FastSmoothRGBSpinner() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 3) % 360)
    }, 16)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div 
        className="relative w-16 h-16" 
        role="status"
        aria-label="Loading"
      >
        <div
          className="absolute inset-0 rounded-full animate-[fastSmoothRgb_2s_linear_infinite]"
          style={{
            background: `conic-gradient(from ${rotation}deg, #ff0000, #00ff00, #0000ff, #ff0000)`,
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        ></div>
        <div className="absolute inset-1 bg-gray-900 rounded-full"></div>
        <div className="sr-only">Loading...</div>
      </div>
    </div>
  )
}