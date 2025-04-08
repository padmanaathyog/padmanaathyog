import Image from "next/image"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import { upcomingEvents } from "@/lib/data"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export const metadata = {
  title: "Upcoming Events & Workshops",
  description:
    "Explore our upcoming yoga events, workshops, and retreats at Padmanaath Yog. Deepen your practice and connect with our community.",
}

export default function EventsPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Upcoming Events & Workshops"
          subtitle="Deepen your practice with our special events and workshops designed to explore specific aspects of traditional yoga."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1 bg-yoga-burnt text-white rounded-full text-sm font-medium">
                    {event.price}
                  </span>
                </div>
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

                <Button className="w-full bg-yoga-burnt hover:bg-yoga-lightorange">Book Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Past Events Section */}
        <SectionHeader
          title="Past Events"
          subtitle="Explore our previous workshops and gatherings at Padmanaath Yog."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Past events would be populated here */}
          <div className="sanatan-card overflow-hidden opacity-70 group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Summer Solstice Yoga Retreat"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Summer Solstice Yoga Retreat</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                A special day of practice celebrating the summer solstice with sunrise meditation and energizing yoga
                sequences.
              </p>

              <div className="flex flex-col space-y-2 mb-5 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-yoga-burnt" />
                  <span>June 21, 2023</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-yoga-burnt" />
                  <span>Velneshwar Beach, Kokan</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
              >
                View Gallery
              </Button>
            </div>
          </div>

          <div className="sanatan-card overflow-hidden opacity-70 group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Ayurvedic Cooking Workshop"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Ayurvedic Cooking Workshop</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                Learning to prepare sattvic meals according to Ayurvedic principles to support digestive health and
                overall wellbeing.
              </p>

              <div className="flex flex-col space-y-2 mb-5 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-yoga-burnt" />
                  <span>May 15, 2023</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-yoga-burnt" />
                  <span>Padmanaath Yog Kendra, Jamsut</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
              >
                View Gallery
              </Button>
            </div>
          </div>

          <div className="sanatan-card overflow-hidden opacity-70 group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Pranayama Intensive"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">Pranayama Intensive</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                A weekend dedicated to breath control techniques from the classical yoga tradition.
              </p>

              <div className="flex flex-col space-y-2 mb-5 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-yoga-burnt" />
                  <span>April 8-9, 2023</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-yoga-burnt" />
                  <span>Consultation Center, Pune</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

