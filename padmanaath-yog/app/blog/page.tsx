import SectionHeader from "@/components/section-header"
import BlogCard from "@/components/blog-card"
import { blogPosts } from "@/lib/data"

export const metadata = {
  title: "Yoga & Wellness Blog",
  description:
    "Explore articles on yoga practices, meditation techniques, wellness tips, and spiritual insights to support your journey.",
}

export default function BlogPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Yoga & Wellness Blog"
          subtitle="Insights, tips, and wisdom to deepen your practice and enhance your wellbeing."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <nav className="glassmorphic inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-yoga-burnt/20 text-yoga-burnt hover:bg-yoga-burnt/10"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-yoga-burnt/20 text-yoga-burnt hover:bg-yoga-burnt/10"
            >
              1
            </a>
            <a
              href="#"
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-yoga-burnt/20 bg-yoga-burnt text-white"
            >
              2
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-yoga-burnt/20 text-yoga-burnt hover:bg-yoga-burnt/10"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium border-r border-yoga-burnt/20 text-gray-400">
              ...
            </span>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-yoga-burnt hover:bg-yoga-burnt/10"
            >
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}

