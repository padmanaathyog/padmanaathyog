"use client"

import type React from "react"

import { useEffect, useState } from "react"
import InaugurationWelcome from "@/components/inauguration-welcome"

export default function HomeClient({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && <InaugurationWelcome />}
      {children}
    </>
  )
}
