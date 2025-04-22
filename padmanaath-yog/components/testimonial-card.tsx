import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  image: string
  rating: number
}

export default function TestimonialCard({ name, role, quote, image, rating }: TestimonialCardProps) {
  return (
    <div className="glassmorphic p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>

      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className={i < rating ? "fill-yoga-orange text-yoga-orange" : "text-gray-300"} />
        ))}
      </div>

      <p className="text-gray-600 italic">"{quote}"</p>
    </div>
  )
}
