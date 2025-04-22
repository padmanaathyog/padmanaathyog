"use client"

import { useEffect } from "react"
import { setupContentProtection } from "@/lib/content-protection"

export default function ContentProtection() {
  useEffect(() => {
    setupContentProtection()
  }, [])

  return null
}
