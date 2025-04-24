"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [latestEvent, setLatestEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Only show on homepage and events page
  const shouldShowOnPage = pathname === "/" || pathname === "/events" || pathname === "/contact"

  useEffect(() => {
    // Fetch the latest event directly using Supabase
    const fetchLatestEvent = async () => {
      try {
        setLoading(true)

        // Get upcoming events (where is_past is false)
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("is_past", false)
          .order("date", { ascending: true })
          .limit(1)

        if (error) {
          console.error("Error fetching latest event:", error)
          return
        }

        if (data && data.length > 0) {
          setLatestEvent(data[0])
        }
      } catch (error) {
        console.error("Failed to fetch latest event:", error)
      } finally {
        setLoading(false)
      }
    }

    if (shouldShowOnPage) {
      fetchLatestEvent()
    }
  }, [shouldShowOnPage])

  useEffect(() => {
    // Show popup after a short delay, but only on allowed pages and if we have an event
    if (shouldShowOnPage && latestEvent && !loading) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [shouldShowOnPage, latestEvent, loading])

  if (!isOpen || !shouldShowOnPage || !latestEvent) return null

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

          <div className="flex justify-end">
            <Link href="/events">
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
