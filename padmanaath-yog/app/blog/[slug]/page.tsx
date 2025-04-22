"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogService, type BlogExternalRef } from "@/lib/services/blog-service"
import { ErrorMessage } from "@/components/error-message"

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogExternalRef | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await BlogService.getBySlug(slug)

        if (!data) {
          setError("Blog post not found")
          return
        }

        setPost(data)
      } catch (err) {
        console.error(`Failed to fetch blog post with slug ${slug}:`, err)
        setError("Failed to load blog post. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlogPost()
    }
  }, [slug])

  // This is a placeholder for the future external blog provider
  // For now, we'll just display the basic information we have
  const renderContent = () => {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-700 mb-6">{post?.excerpt}</p>

        <div className="py-4 px-6 bg-yoga-cream/30 rounded-lg mb-6">
          <p className="italic text-gray-700">
            This blog post will be loaded from an external provider in the future. For now, we're displaying placeholder
            content.
          </p>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
          aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
          nisl, eget aliquam nisl nisl sit amet nisl.
        </p>

        <h2>The Benefits of Regular Practice</h2>

        <p>
          Yoga is a practice that combines physical postures, breathing exercises, and meditation. It is a holistic
          approach to health and well-being that has been practiced for thousands of years. Regular practice of yoga can
          help improve flexibility, strength, and balance, as well as reduce stress and anxiety.
        </p>

        <p>
          In addition to the physical benefits, yoga also offers mental and emotional benefits. It can help improve
          focus and concentration, reduce stress and anxiety, and promote a sense of calm and well-being.
        </p>

        <h2>Getting Started with Yoga</h2>

        <p>
          If you're new to yoga, it's important to start slowly and listen to your body. Begin with basic poses and
          gradually work your way up to more challenging ones. It's also important to find a qualified instructor who
          can guide you through the practice and help you avoid injury.
        </p>

        <p>
          Remember, yoga is not about competition or perfection. It's about connecting with your body and breath, and
          finding peace and balance in your life.
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="page-padding">
        <div className="container max-w-4xl">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yoga-burnt"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="page-padding">
        <div className="container max-w-4xl">
          <Button variant="ghost" className="mb-8" onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>

          <ErrorMessage
            message={error || "Blog post not found"}
            retry={
              error === "Failed to load blog post. Please try again later."
                ? () => {
                    setLoading(true)
                    setError(null)
                    BlogService.getBySlug(slug)
                      .then((data) => {
                        if (!data) {
                          setError("Blog post not found")
                          return
                        }
                        setPost(data)
                      })
                      .catch((err) => {
                        console.error(`Failed to fetch blog post with slug ${slug}:`, err)
                        setError("Failed to load blog post. Please try again later.")
                      })
                      .finally(() => setLoading(false))
                  }
                : undefined
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="page-padding">
      <div className="container max-w-4xl">
        <Button variant="ghost" className="mb-8" onClick={() => router.push("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yoga-burnt mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4 text-yoga-burnt" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-yoga-burnt" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg?height=800&width=1200"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {renderContent()}

        <div className="mt-12 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={() => router.push("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    </div>
  )
}
