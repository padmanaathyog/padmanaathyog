import SectionHeader from "@/components/section-header"
import Image from "next/image"

export default function BlogPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader title="Yoga Blog" subtitle="Insights, wisdom, and practical guidance for your yoga journey." />

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative w-64 h-64 mb-8">
            <Image
              src="/heroSection.png?height=500&width=800"
              alt="Coming Soon"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-3xl font-heading font-bold text-yoga-burnt mb-4">Coming Soon</h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're working on creating valuable content for your yoga journey. Our blog will be available soon with
            insights, wisdom, and practical guidance.
          </p>

          <div className="mt-8 p-4 bg-yoga-lightgreen/20 rounded-lg max-w-md">
            <p className="text-yoga-green font-medium">
              Check back soon for articles on yoga philosophy, practice tips, wellness advice, and more!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
