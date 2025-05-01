"use client"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar, MapPin, Clock } from "lucide-react"
import type { Event } from "@/lib/services/event-service"

interface EventsTabProps {
  events: Event[]
  isLoading: boolean
  searchTerm: string
  onEdit: (event: Event) => void
  onDelete: (event: Event) => void
  editingItemId: number | null
}

export default function EventsTab({ events, isLoading, searchTerm, onEdit, onDelete, editingItemId }: EventsTabProps) {
  // No filtering by search term anymore
  const displayedEvents = events

  // Function to format date in a user-friendly way
  const formatEventDate = (dateString: string | undefined) => {
    if (!dateString) return "Date not specified"

    try {
      // Try to parse the date - handle both ISO strings and formatted strings
      let date: Date
      if (dateString.includes("T")) {
        // ISO format
        date = parseISO(dateString)
      } else {
        // Already formatted string like "April 15, 2023"
        date = new Date(dateString)
      }

      if (isNaN(date.getTime())) {
        return dateString // If parsing fails, return the original string
      }

      return format(date, "EEEE, MMMM d, yyyy")
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">No events found</h3>
        <p className="text-gray-400 mt-2">Add your first event to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedEvents.map((event) => (
        <Card
          key={event.id}
          className={`overflow-hidden transition-all duration-200 ${
            editingItemId === event.id ? "ring-2 ring-yoga-burnt" : ""
          }`}
        >
          <div className="relative h-48 w-full">
            {event.image ? (
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                <Calendar size={48} />
              </div>
            )}
            {/* Date badge overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span className="font-medium">{formatEventDate(event.date)}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-3">{event.title}</h3>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Clock size={14} className="mr-1 flex-shrink-0" />
              <span>{event.time || "Time not specified"}</span>
            </div>

            {event.location && (
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin size={14} className="mr-1 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            )}

            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{event.description}</p>

            <div className="flex justify-between items-center">
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  event.is_past ? "bg-gray-200 text-gray-700" : "bg-green-100 text-green-800"
                }`}
              >
                {event.is_past ? "Past Event" : "Upcoming"}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-yoga-burnt"
                  onClick={() => onEdit(event)}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  onClick={() => onDelete(event)}
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
