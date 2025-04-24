"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { Testimonial } from "@/lib/services/testimonial-service"

interface TestimonialsTabProps {
  testimonials: Testimonial[]
  isLoading: boolean
  searchTerm: string
  onEdit: (testimonial: Testimonial) => void
  onDelete: (testimonial: Testimonial) => void
  refreshData: () => void
  editingItemId: number | null
}

export default function TestimonialsTab({
  testimonials,
  isLoading,
  searchTerm,
  onEdit,
  onDelete,
  refreshData,
  editingItemId,
}: TestimonialsTabProps) {
  // No filtering by search term anymore
  const displayedTestimonials = testimonials

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-500">No testimonials found</h3>
        <p className="text-gray-400 mt-2">Add your first testimonial to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedTestimonials.map((testimonial) => (
        <Card
          key={testimonial.id}
          className={`overflow-hidden transition-all duration-200 ${
            editingItemId === testimonial.id ? "ring-2 ring-yoga-burnt" : ""
          }`}
        >
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                  {testimonial.image ? (
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-yoga-burnt flex items-center justify-center text-white text-lg font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm line-clamp-4 mb-2">{testimonial.content}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-600 hover:text-yoga-burnt"
                  onClick={() => onEdit(testimonial)}
                >
                  <Edit size={16} className="mr-1" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  onClick={() => onDelete(testimonial)}
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
