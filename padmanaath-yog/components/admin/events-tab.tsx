"use client"
import Image from "next/image"
import { Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Event } from "@/lib/services/event-service"

interface EventsTabProps {
  events: Event[]
  isLoading: boolean
  searchTerm: string
  onEdit: (event: Event) => void
  onDelete: (event: Event) => void
}

export default function EventsTab({ events, isLoading, searchTerm, onEdit, onDelete }: EventsTabProps) {
  // Filter events based on search term
  const filteredEvents =
    events && Array.isArray(events)
      ? events.filter(
          (event) =>
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          No events found. {searchTerm ? "Try a different search term." : "Create your first event!"}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spots</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <Image
                        src={event.image || "/placeholder.svg?height=40&width=40"}
                        alt={event.title}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.spots}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => onEdit(event)}
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(event)}
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
                      <Eye size={16} className="mr-1" /> View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredEvents.length}</span> of{" "}
              <span className="font-medium">{filteredEvents.length}</span> results
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
