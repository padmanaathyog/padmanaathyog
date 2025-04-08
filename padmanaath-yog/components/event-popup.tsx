"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { upcomingEvents } from "@/lib/data"

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const latestEvent = upcomingEvents[0] // Get the most recent event

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden animate-fadeIn">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white z-10"
          aria-label="Close popup"
        >
          <X size={20} className="text-yoga-burnt" />
        </button>

        <div className="relative h-48 w-full">
          <Image src={latestEvent.image || "/placeholder.svg"} alt={latestEvent.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <span className="px-3 py-1 bg-yoga-burnt text-white rounded-full text-sm font-medium">Upcoming Event</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-yoga-burnt">{latestEvent.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{latestEvent.description}</p>

          <div className="flex flex-col space-y-2 mb-4 text-sm">
            <div className="flex items-center">
              <span className="font-medium mr-2">Date:</span>
              <span>{latestEvent.date}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Time:</span>
              <span>{latestEvent.time}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Location:</span>
              <span>{latestEvent.location}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-yoga-burnt">{latestEvent.price}</span>
            <Link href="/events">
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

