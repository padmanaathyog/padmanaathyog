import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, BarChart } from "lucide-react"
import { yogaClasses } from "@/lib/data"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const yogaClass = yogaClasses.find((c) => c.id === id)

  if (!yogaClass) {
    return {
      title: "Class Not Found",
    }
  }

  return {
    title: `${yogaClass.title} | Yoga Classes`,
    description: yogaClass.description,
  }
}

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const yogaClass = yogaClasses.find((c) => c.id === id)

  if (!yogaClass) {
    return notFound()
  }

  return (
    <div className="page-padding">
      <div className="container">
        <div className="mb-8">
          <Link
            href="/classes"
            className="text-yoga-sage hover:text-yoga-leaf transition-colors mb-4 inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Classes
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image src={yogaClass.image || "/placeholder.svg"} alt={yogaClass.title} fill className="object-cover" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-leaf">{yogaClass.title}</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Clock size={18} className="mr-2 text-yoga-sage" />
                <span>{yogaClass.duration}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <BarChart size={18} className="mr-2 text-yoga-sage" />
                <span>{yogaClass.level}</span>
              </div>
            </div>

            <p className="text-lg mb-6 text-muted-foreground">{yogaClass.description}</p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Class Schedule</h3>
              <div className="glassmorphic p-4 divide-y divide-yoga-sage/10">
                {yogaClass.schedule.map((slot, index) => (
                  <div key={index} className="py-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-yoga-sage" />
                      <span>{slot.day}</span>
                    </div>
                    <span>{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yoga-sage hover:bg-yoga-leaf">
                Book This Class
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-yoga-sage text-yoga-sage hover:bg-yoga-sage hover:text-white"
              >
                View All Classes
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-yoga-leaf">What to Expect</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">Before Class</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Arrive 10-15 minutes early</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Wear comfortable, stretchy clothing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Bring a water bottle</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>No food 1-2 hours before class</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">During Class</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Focus on your breath</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Listen to your body</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Ask for modifications if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Stay present and mindful</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">After Class</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Stay for final relaxation (Savasana)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Hydrate well</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Observe how you feel</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-sage">•</span>
                  <span>Ask the instructor questions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

