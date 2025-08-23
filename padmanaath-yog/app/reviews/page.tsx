"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SectionHeader from "@/components/section-header"
import TestimonialCard from "@/components/testimonial-card"
import { TestimonialService, type Testimonial } from "@/lib/services/testimonial-service"
import { Button } from "@/components/ui/button"
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

export default function ReviewsPage() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [totalTestimonials, setTotalTestimonials] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const testimonialsPerPage = 9
  const totalPages = Math.ceil(totalTestimonials / testimonialsPerPage)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, count } = await TestimonialService.getAll(currentPage, testimonialsPerPage)
        setTestimonials(data)
        setTotalTestimonials(count)
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
        setError("Failed to load testimonials. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [currentPage])

  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/reviews?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={`/reviews?page=${page}`} isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            }

            // Show ellipsis for gaps
            if (page === 2 || page === totalPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return null
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/reviews?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
            title="Reviews & Testimonials"
          subtitle="Discover what our community has to say about their experiences with Padmanaath Yoga."
        />

        {error ? (
          <ErrorMessage
            message={error}
            retry={() => {
              setLoading(true)
              setError(null)
              TestimonialService.getAll(currentPage, testimonialsPerPage)
                .then(({ data, count }) => {
                  setTestimonials(data)
                  setTotalTestimonials(count)
                })
                .catch((err) => {
                  console.error("Failed to fetch testimonials:", err)
                  setError("Failed to load testimonials. Please try again later.")
                })
                .finally(() => setLoading(false))
            }}
          />
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No testimonials found</h3>
            <p className="text-gray-500 mt-2">Be the first to share your experience!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </div>

            {renderPagination()}
          </>
        )}
      </div>
    </div>
  )
}
