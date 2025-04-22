import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { blogPosts } from "@/lib/data"
import BlogCard from "@/components/BlogCard"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Yoga Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return notFound()
  }

  // Get related posts (same tag)
  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3)

  return (
    <div className="page-padding">
      <div className="container">
        <div className="mb-8">
          <Link
            href="/blog"
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
            Back to Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-yoga-leaf">{post.title}</h1>
            <div className="flex items-center justify-center text-muted-foreground mb-6">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 bg-yoga-mint/30 text-yoga-leaf rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose max-w-none text-muted-foreground mb-8">
            <p>{post.excerpt}</p>
            <p>
              Yoga has been practiced for thousands of years and continues to evolve as we deepen our understanding of
              its benefits for the mind, body, and spirit. In today's fast-paced world, finding moments of stillness and
              connection is more important than ever.
            </p>
            <h2>The Science Behind the Practice</h2>
            <p>
              Recent studies have shown that regular yoga practice can significantly reduce stress levels by lowering
              cortisol production. The combination of mindful movement, breath awareness, and meditation creates a
              powerful cocktail for combating the negative effects of chronic stress on the body.
            </p>
            <p>
              Beyond stress reduction, yoga has been linked to improved flexibility, increased muscle strength, enhanced
              respiratory function, and better circulatory health. The holistic nature of yoga means it addresses
              physical wellness while simultaneously nurturing mental clarity and emotional balance.
            </p>
            <h2>Integrating Practice Into Daily Life</h2>
            <p>
              The true power of yoga extends far beyond the mat. The principles and awareness cultivated during practice
              can be applied to daily challenges, relationships, and decision-making processes. By bringing mindfulness
              into everyday activities, we extend the benefits of yoga into all aspects of life.
            </p>
            <p>
              Even a short daily practice of 10-15 minutes can yield significant benefits over time. Consistency matters
              more than duration when it comes to experiencing the transformative effects of yoga.
            </p>
            <h2>Moving Forward</h2>
            <p>
              Whether you're new to yoga or a seasoned practitioner, there's always room to grow and deepen your
              practice. Listen to your body, honor your limitations, and celebrate your progress as you continue on this
              journey of self-discovery and wellness.
            </p>
          </div>

          <div className="border-t border-yoga-sage/20 pt-8 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image src="/placeholder.svg?height=200&width=200" alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{post.author}</h4>
                  <p className="text-sm text-muted-foreground">Yoga Instructor & Wellness Writer</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-yoga-leaf transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-yoga-leaf transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-yoga-leaf transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-yoga-leaf">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
