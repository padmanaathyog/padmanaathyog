"use client"

import { useEffect, useState } from "react"
import SectionHeader from "@/components/section-header"
import BlogCard from "@/components/BlogCard"
import { BlogService, type BlogExternalRef } from "@/lib/services/blog-service"
import { Pagination } from "@/components/ui/pagination"

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogExternalRef[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const pageSize = 9

  useEffect(() => {
    loadBlogs()
  }, [currentPage])

  const loadBlogs = async () => {
    setIsLoading(true)
    try {
      const result = await BlogService.getAll(currentPage, pageSize)
      setBlogs(result.data)
      setTotalCount(result.count)
    } catch (error) {
      console.error("Error loading blogs:", error)
      setBlogs([])
    } finally {
      setIsLoading(false)
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  if (isLoading) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader title="Yoga Blog" subtitle="Insights, wisdom, and practical guidance for your yoga journey." />
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        </div>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="page-padding">
        <div className="container">
          <SectionHeader title="Yoga Blog" subtitle="Insights, wisdom, and practical guidance for your yoga journey." />
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-3xl font-heading font-bold text-yoga-burnt mb-4">No Blog Posts Yet</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We're working on creating valuable content for your yoga journey. Check back soon!
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader title="Yoga Blog" subtitle="Insights, wisdom, and practical guidance for your yoga journey." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              author={blog.author}
              date={blog.date}
              slug={blog.slug}
              tags={blog.tags || []}
              external_id={blog.external_id}
              provider={blog.provider}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center py-8">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-yoga-burnt text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yoga-lightorange transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 flex items-center text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-yoga-burnt text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yoga-lightorange transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
