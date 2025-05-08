"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function InaugurationWelcome() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const router = useRouter()

  // Images to alternate between
  const images = [
    { src: "/logo-detailed.svg", alt: "Padmanaath Yog Logo", type: "logo" },
    { src: "/padmanaath-qr-code.png", alt: "Padmanaath Yog QR Code", type: "qr" },
  ]
  // Handle keydown event to proceed to main site
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setShowWelcome(false)
    }
  }, [])

  // Handle button click for mobile users
  const handleProceed = () => {
    setShowWelcome(false)
  }

  // Set up event listeners and image rotation
  useEffect(() => {
    // Add keydown listener
    window.addEventListener("keydown", handleKeyDown)

    // Set up image rotation
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 3000)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [handleKeyDown])

  // Redirect to home page if welcome is not shown
  useEffect(() => {
    if (!showWelcome) {
      // We don't actually navigate, just hide the welcome screen
      // The main content is already loaded behind it
    }
  }, [showWelcome, router])

  if (!showWelcome) return null

  return (
    <div className="fixed inset-0 bg-yoga-cream z-[100] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.div
        key={currentImage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
        >
        <div className="relative w-80 h-80 mb-8"> {/* Increased size */}
          {images[currentImage].type === "logo" ? (
          <Image
            src={images[currentImage].src || "/placeholder.svg"}
            alt={images[currentImage].alt}
            fill
            className="object-contain"
            priority
          />
          ) : (
          <div className="bg-white p-6 rounded-lg shadow-md"> {/* Adjusted padding */}
            <Image
            src={images[currentImage].src || "/placeholder.svg"}
            alt={images[currentImage].alt}
            width={250} 
            height={250} 
            className="object-contain"
            priority
            />
          </div>
          )}
        </div>
          </motion.div>
        </AnimatePresence>

        <h1 className="text-2xl md:text-3xl font-bold text-yoga-burnt mb-6">Welcome to padmanaathyog</h1>
        <p className="text-lg md:text-xl text-yoga-brown mb-8">
          For Perfect physical, mental, social and spiritual well being..
        </p>

        <div className="flex flex-col items-center">
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            Click the below button to proceed further...
          </p>
          <button
            onClick={handleProceed}
            className="bg-yoga-burnt hover:bg-yoga-lightorange text-white px-6 py-3 rounded-md text-lg transition-colors duration-300 mt-2"
          >
            Proceed to Website
          </button>
        </div>
      </div>
    </div>
  )
}
