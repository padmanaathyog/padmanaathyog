"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SectionHeader from "@/components/section-header"
import BlogCard from "@/components/blog-card"
import { BlogService, type BlogExternalRef } from "@/lib/services/blog-service"
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

export default function BlogPage() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1

  const [blogPosts, setBlogPosts] = useState<BlogExternalRef[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const postsPerPage = 9
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, count } = await BlogService.getAll(currentPage, postsPerPage)
        setBlogPosts(data)
        setTotalPosts(count)
      } catch (err) {
        console.error("Failed to fetch blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [currentPage])

  const renderPagination = () => {
    if (totalPages <= 1) return null

    return (
      <Pagination className="my-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/blog?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1

            // Show first page, last page, and pages around current page
            if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink href={`/blog?page=${page}`} isActive={page === currentPage}>
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
              <PaginationNext href={`/blog?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader title="Yoga Blog" subtitle="Insights, wisdom, and practical guidance for your yoga journey." />

        {error ? (
          <ErrorMessage
            message={error}
            retry={() => {
              setLoading(true)
              setError(null)
              BlogService.getAll(currentPage, postsPerPage)
                .then(({ data, count }) => {
                  setBlogPosts(data)
                  setTotalPosts(count)
                })
                .catch((err) => {
                  console.error("Failed to fetch blog posts:", err)
                  setError("Failed to load blog posts. Please try again later.")
                })
                .finally(() => setLoading(false))
            }}
          />
        ) : loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No blog posts found</h3>
            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>

            {renderPagination()}
          </>
        )}
      </div>
    </div>
  )
}
