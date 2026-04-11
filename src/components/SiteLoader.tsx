"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function SiteLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F6F1E7]">
      <div className="flex flex-col items-center justify-center px-6 text-center">
     <div className="relative h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40">
          <Image
            src="/logo/organocityBackup.png"
            alt="OrganoCity"
            fill
            priority
            className="object-contain"
          />
        </div>

        <h1 className="mt-5 text-2xl font-semibold tracking-wide text-[#1E1F1C] sm:text-3xl">
          OrganoCity
        </h1>

        <p className="mt-2 text-sm text-[#5A5E55] sm:text-base">
          Pure Himalayan wellness
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1F6B4F] [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1F6B4F] [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1F6B4F]" />
        </div>
      </div>
    </div>
  )
}