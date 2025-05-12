"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function InaugurationWelcome() {
  const [showWelcome, setShowWelcome] = useState(true)
  const router = useRouter()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    router.push("/home")
    setShowWelcome(false)
  }, [router])

  const handleProceed = () => {
    router.push("/home")
    setShowWelcome(false)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  if (!showWelcome) return null

  return (
    <div className="fixed inset-0 bg-yoga-cream z-[100] flex flex-col items-center justify-center px-4 py-8">
  <div className="w-full max-w-sm md:max-w-md text-center space-y-6">
    
    <div className="flex justify-center">
      <Image
        src="/logo-detailed.svg"
        alt="Padmanaath Yog Logo"
        width={350}
        height={350}
        className="object-contain w-full max-w-[350px] md:max-w-[500px]"
        priority
      />
    </div>

    <h1 className="text-3xl md:text-4xl font-extrabold text-yoga-burnt">
      Welcome to Padmanaath Yog
    </h1>

    <p className="text-lg md:text-xl font-semibold text-yoga-brown">
      For perfect physical, mental, social and spiritual well-being.
    </p>

    <div className="flex flex-col items-center space-y-4 pt-2">
      <p className="text-base md:text-lg font-medium text-muted-foreground">
        Click the button below to proceed...
      </p>
      <button
        onClick={handleProceed}
        className="bg-yoga-burnt hover:bg-yoga-lightorange text-white px-6 py-3 rounded-md text-lg font-bold transition-colors duration-300"
      >
        Proceed to Website
      </button>
    </div>

  </div>
</div>

  )
}
