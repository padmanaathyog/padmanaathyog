"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Testimonial } from "@/lib/services/testimonial-service"

interface TestimonialsTabProps {
  testimonials: Testimonial[]
  isLoading: boolean
  searchTerm: string
  onEdit: (testimonial: Testimonial) => void
  onDelete: (testimonial: Testimonial) => void
  refreshData: () => void
}

export default function TestimonialsTab({
  testimonials,
  isLoading,
  searchTerm,
  onEdit,
  onDelete,
  refreshData,
}: TestimonialsTabProps) {
  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">
          No testimonials found. {searchTerm ? "Try a different search term." : "Add your first testimonial!"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTestimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 relative"
        >
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600" onClick={() => onEdit(testimonial)}>
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600"
              onClick={() => onDelete(testimonial)}
            >
              <Trash2 size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-600">
              <Eye size={16} />
            </Button>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-600 italic">"{testimonial.quote}"</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">{new Date(testimonial.created_at).toLocaleDateString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
