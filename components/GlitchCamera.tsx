"use client"

import { useEffect, useState } from "react"

interface GlitchCameraProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export default function GlitchCamera({ size = "md", animated = true }: GlitchCameraProps) {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [animated])

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      <div className={`${glitchActive ? "animate-glitch" : ""} transition-all duration-200`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" fill="none">
          {/* جسم الكاميرا */}
          <rect
            x="10"
            y="25"
            width="80"
            height="50"
            rx="8"
            fill="url(#cameraBody)"
            stroke="url(#cameraStroke)"
            strokeWidth="2"
          />

          {/* العدسة الخارجية */}
          <circle cx="50" cy="50" r="18" fill="url(#lensOuter)" stroke="#4A4A4A" strokeWidth="1" />

          {/* العدسة الداخلية مع تأثير Glitch */}
          <circle cx="50" cy="50" r="12" fill="url(#lensInner)" className={glitchActive ? "animate-pulse" : ""} />

          {/* انعكاس العدسة */}
          <ellipse cx="46" cy="46" rx="4" ry="6" fill="rgba(255, 255, 255, 0.6)" transform="rotate(-30 46 46)" />

          {/* فلاش الكاميرا */}
          <rect x="70" y="30" width="8" height="6" rx="2" fill="url(#flash)" />

          {/* زر التصوير */}
          <circle cx="25" cy="35" r="3" fill="url(#button)" />

          {/* خطوط Glitch */}
          {glitchActive && (
            <>
              <line x1="20" y1="40" x2="80" y2="40" stroke="#FF0000" strokeWidth="1" opacity="0.7" />
              <line x1="15" y1="55" x2="85" y2="55" stroke="#00FF00" strokeWidth="1" opacity="0.7" />
              <line x1="25" y1="65" x2="75" y2="65" stroke="#0000FF" strokeWidth="1" opacity="0.7" />
            </>
          )}

          {/* التدرجات */}
          <defs>
            <linearGradient id="cameraBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2C2C2C" />
              <stop offset="50%" stopColor="#4A4A4A" />
              <stop offset="100%" stopColor="#1A1A1A" />
            </linearGradient>

            <linearGradient id="cameraStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#CD853F" />
            </linearGradient>

            <radialGradient id="lensOuter" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1A1A1A" />
              <stop offset="100%" stopColor="#4A4A4A" />
            </radialGradient>

            <radialGradient id="lensInner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="70%" stopColor="#2C2C2C" />
              <stop offset="100%" stopColor="#8B4513" />
            </radialGradient>

            <linearGradient id="flash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0E0E0" />
            </linearGradient>

            <radialGradient id="button" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#CD853F" />
              <stop offset="100%" stopColor="#8B4513" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* تأثير الوهج */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
      )}
    </div>
  )
}
