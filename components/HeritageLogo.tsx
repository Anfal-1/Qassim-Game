"use client"

import Image from "next/image"

interface HeritageLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function HeritageLogo({ size = "md", showText = false }: HeritageLogoProps) {
  const sizeClasses = {
    sm: { container: "w-20 h-20", image: "w-16 h-16", text: "text-lg" },
    md: { container: "w-32 h-32", image: "w-28 h-28", text: "text-2xl" },
    lg: { container: "w-48 h-48", image: "w-44 h-44", text: "text-4xl" },
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* الشعار مع تأثيرات بصرية */}
      <div className="relative">
        {/* تأثير الوهج الخلفي */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full blur-xl animate-pulse"></div>

        {/* حاوية الشعار */}
        <div className={`relative ${sizeClasses[size].container} flex items-center justify-center`}>
          {/* تأثير الظل الناعم */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>

          {/* الصورة */}
          <Image
            src="/logo.png"
            alt="الوجهة الضبابية"
            width={200}
            height={200}
            className={`${sizeClasses[size].image} object-contain drop-shadow-2xl relative z-10 transition-transform duration-300 hover:scale-105`}
            priority
          />

          {/* تأثير الحدود الناعمة */}
          <div className="absolute inset-0 rounded-full border border-white/20 shadow-inner"></div>
        </div>

        {/* تأثير الانعكاس */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full blur-sm"></div>
      </div>

      {/* النص */}
      {showText && (
        <div className="text-center space-y-3">
          <h1
            className={`font-bold gradient-text ${sizeClasses[size].text} glitch-effect animate-fade-in tracking-wide`}
            data-text="الوجهة الضبابية"
          >
           الوجهة الضبابية
          </h1>
          <p className="text-xl lg:text-2xl medium-brown-text font-semibold animate-slide-up tracking-wide">
            اكتشف معالم القصيم السياحية
          </p>
        </div>
      )}
    </div>
  )
}
