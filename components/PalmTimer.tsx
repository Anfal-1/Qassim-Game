"use client"

import { useEffect, useState } from "react"

interface PalmTimerProps {
  timeLeft: number
  totalTime: number
}

export default function PalmTimer({ timeLeft, totalTime }: PalmTimerProps) {
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    setIsWarning(timeLeft <= 5)
  }, [timeLeft])

  return (
    <div className="relative flex items-center justify-center">
      <div className={`${isWarning ? "animate-pulse" : ""} transition-all duration-300`}>
        <svg width="120" height="140" viewBox="0 0 120 140" className="drop-shadow-lg">
          {/* النخلة */}
          <g transform="translate(60, 20)">
            {/* أوراق النخلة */}
            <path
              d="M0 40 Q-25 15 -45 -5 Q-35 5 0 30"
              fill="#7B4B2A"
              className="animate-palm-sway"
              style={{ transformOrigin: "0px 40px" }}
            />
            <path
              d="M0 40 Q25 15 45 -5 Q35 5 0 30"
              fill="#7B4B2A"
              className="animate-palm-sway"
              style={{ transformOrigin: "0px 40px", animationDelay: "0.5s" }}
            />
            <path
              d="M0 40 Q0 10 0 -15 Q5 -5 0 30"
              fill="#7B4B2A"
              className="animate-palm-sway"
              style={{ transformOrigin: "0px 40px", animationDelay: "1s" }}
            />
            <path
              d="M0 40 Q-20 20 -35 0 Q-25 10 0 35"
              fill="#7B4B2A"
              className="animate-palm-sway"
              style={{ transformOrigin: "0px 40px", animationDelay: "1.5s" }}
            />
            <path
              d="M0 40 Q20 20 35 0 Q25 10 0 35"
              fill="#7B4B2A"
              className="animate-palm-sway"
              style={{ transformOrigin: "0px 40px", animationDelay: "2s" }}
            />

            {/* جذع النخلة */}
            <rect x="-3" y="40" width="6" height="20" fill="#5C3B1E" rx="3" />
          </g>

          {/* الدائرة والرقم */}
          <g transform="translate(60, 90)">
            {/* الدائرة الخارجية */}
            <circle
              cx="0"
              cy="0"
              r="35"
              fill="none"
              stroke="#7B4B2A"
              strokeWidth="3"
              className={isWarning ? "animate-pulse" : ""}
            />

            {/* الدائرة الداخلية */}
            <circle cx="0" cy="0" r="30" fill="#EDE9E2" className={isWarning ? "animate-pulse" : ""} />

            {/* النص */}
            <text
              x="0"
              y="8"
              textAnchor="middle"
              className={`text-2xl font-bold transition-all duration-300 ${
                isWarning ? "fill-red-600 animate-pulse" : "fill-[#7B4B2A]"
              }`}
              style={{ fontSize: "24px" }}
            >
              {timeLeft}
            </text>
          </g>

          {/* تأثير التحذير */}
          {isWarning && (
            <g>
              <circle cx="60" cy="90" r="40" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.5">
                <animate attributeName="r" values="35;45;35" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="1s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}
