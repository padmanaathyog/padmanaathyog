import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Clock, BarChart, Calendar } from "lucide-react"

interface ClassCardProps {
  id: number
  title: string
  description: string
  image: string
  level: string
  duration: string
  price: string
  schedule: Array<{ day: string; time: string }>
  className?: string
}

export default function ClassCard({
  id,
  title,
  description,
  image,
  level,
  duration,
  price,
  schedule,
  className,
}: ClassCardProps) {
  return (
    <div
      className={cn("glass-card overflow-hidden transition-all duration-300 group hover:translate-y-[-8px]", className)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-2 py-1 bg-yoga-orange text-white rounded-lg text-xs font-medium">{level}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Clock size={16} className="mr-2 text-yoga-orange" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm">
            <BarChart size={16} className="mr-2 text-yoga-orange" />
            <span>{level}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar size={16} className="mr-2 text-yoga-orange" />
            <span>
              {schedule[0].day} at {schedule[0].time}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">{price}</span>
          <Link
            href={`/classes/${id}`}
            className="text-yoga-orange hover:text-yoga-ochre transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
