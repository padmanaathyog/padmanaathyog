"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px 0px" })
  const controls = useAnimation()
  const [hasAnimated, setHasAnimated] = useState(false)

  // Set initial animation states based on direction
  let initial = {}
  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
    case "none":
      initial = { opacity: 0 }
      break
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      })
      setHasAnimated(true)
    }
  }, [isInView, controls, delay, duration, hasAnimated])

  return (
    <motion.div ref={ref} initial={initial} animate={controls} className={className}>
      {children}
    </motion.div>
  )
}
