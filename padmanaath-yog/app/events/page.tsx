"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { EventService, type Event } from "@/lib/services/event-service"
import { ErrorMessage } from "@/components/error-message"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function EventsPage() {
  const googleFormLink = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;
  const searchParams = useSearchParams()
  const upcomingPageParam = searchParams.get("upcomingPage")
  const pastPageParam = searchParams.get("pastPage")
  const currentUpcomingPage = upcomingPageParam ? Number.parseInt(upcomingPageParam) : 1
  const currentPastPage = pastPageParam ? Number.parseInt(pastPageParam) : 1

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [totalUpcomingEvents, setTotalUpcomingEvents] = useState(0)
  const [totalPastEvents, setTotalPastEvents] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const eventsPerPage = 6
  const totalUpcomingPages = Math.ceil(totalUpcomingEvents / eventsPerPage)
  const totalPastPages = Math.ceil(totalPastEvents / eventsPerPage)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        // Update event statuses first
        await EventService.updatePastStatus()

        const [upcomingResult, pastResult] = await Promise.all([
          EventService.getUpcomingEvents(currentUpcomingPage, eventsPerPage),
          EventService.getPastEvents(currentPastPage, eventsPerPage),
        ])

        setUpcomingEvents(upcomingResult.data)
        setTotalUpcomingEvents(upcomingResult.count)
        setPastEvents(pastResult.data)
        setTotalPastEvents(pastResult.count)
      } catch (err) {
        console.error("Failed to fetch events:", err)
        setError("Failed to load events. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [currentUpcomingPage, currentPastPage])

  const renderUpcomingPagination = () => {
    if (totalUpcomingPages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentUpcomingPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/events?upcomingPage=${currentUpcomingPage - 1}&pastPage=${currentPastPage}`}
              />
            </PaginationItem>
          )}

          {Array.from({ length: totalUpcomingPages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (
              page === 1 ||
              page === totalUpcomingPages ||
              (page >= currentUpcomingPage - 1 && page <= currentUpcomingPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/events?upcomingPage=${page}&pastPage=${currentPastPage}`}
                    isActive={page === currentUpcomingPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalUpcomingPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          {currentUpcomingPage < totalUpcomingPages && (
            <PaginationItem>
              <PaginationNext href={`/events?upcomingPage=${currentUpcomingPage + 1}&pastPage=${currentPastPage}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  const renderPastPagination = () => {
    if (totalPastPages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentPastPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/events?upcomingPage=${currentUpcomingPage}&pastPage=${currentPastPage - 1}`}
              />
            </PaginationItem>
          )}

          {Array.from({ length: totalPastPages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (page === 1 || page === totalPastPages || (page >= currentPastPage - 1 && page <= currentPastPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`/events?upcomingPage=${currentUpcomingPage}&pastPage=${page}`}
                    isActive={page === currentPastPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalPastPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          {currentPastPage < totalPastPages && (
            <PaginationItem>
              <PaginationNext href={`/events?upcomingPage=${currentUpcomingPage}&pastPage=${currentPastPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  if (loading) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader
            title="Upcoming Events & Workshops"
            subtitle="Deepen your practice with our special events and workshops designed to explore specific aspects of traditional yoga."
          />
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader
            title="Upcoming Events & Workshops"
            subtitle="Deepen your practice with our special events and workshops designed to explore specific aspects of traditional yoga."
          />
          <ErrorMessage
            message={error}
            retry={() => {
              setLoading(true)
              setError(null)
              Promise.all([
                EventService.getUpcomingEvents(currentUpcomingPage, eventsPerPage),
                EventService.getPastEvents(currentPastPage, eventsPerPage),
              ])
                .then(([upcomingResult, pastResult]) => {
                  setUpcomingEvents(upcomingResult.data)
                  setTotalUpcomingEvents(upcomingResult.count)
                  setPastEvents(pastResult.data)
                  setTotalPastEvents(pastResult.count)
                })
                .catch((err) => {
                  console.error("Failed to fetch events:", err)
                  setError("Failed to load events. Please try again later.")
                })
                .finally(() => setLoading(false))
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Upcoming Events & Workshops"
          subtitle="Deepen your practice with our special events and workshops designed to explore specific aspects of traditional yoga."
        />

        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No upcoming events</h3>
            <p className="text-gray-500 mt-2">Check back soon for new events!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="sanatan-card overflow-hidden group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2 text-yoga-burnt">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex flex-col space-y-2 mb-5 text-sm">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.spots} spots available</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-yoga-burnt hover:bg-yoga-lightorange"
                      onClick={() => window.open(googleFormLink, "_blank")}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {renderUpcomingPagination()}
          </>
        )}

        {/* Past Events Section */}
        <SectionHeader
          title="Past Events"
          subtitle="Explore our previous workshops and gatherings at Padmanaath Yog."
        />

        {pastEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No past events to display</h3>
            <p className="text-gray-500 mt-2">Check back after our upcoming events have concluded</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="sanatan-card overflow-hidden opacity-70 group">
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                    <div className="flex flex-col space-y-2 mb-5 text-sm">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-yoga-burnt" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
                      onClick={() => window.open("/gallery", "_self")}
                    >
                      View Gallery
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {renderPastPagination()}
          </>
        )}
      </div>
    </div>
  )
}
