import SectionHeader from "@/components/section-header"
import TestimonialCard from "@/components/testimonial-card"
import { testimonials } from "@/lib/data"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Student Reviews & Testimonials",
  description: "Hear from our yoga community about their transformative experiences and journeys with us.",
}

export default function ReviewsPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Student Reviews & Testimonials"
          subtitle="Discover what our community has to say about their experiences with Serenity Yoga."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>

        {/* Submit a Review */}
        <section className="bg-yoga-mint/10 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yoga-leaf">Share Your Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear about your journey with us. Your feedback helps us grow and inspires others in their
              yoga practice.
            </p>
          </div>

          <form className="max-w-2xl mx-auto">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="glassmorphic w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yoga-sage"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="glassmorphic w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yoga-sage"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-gray-300 hover:text-yoga-terracotta focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                  Classes You've Taken
                </label>
                <select
                  id="class"
                  name="class"
                  className="glassmorphic w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yoga-sage"
                >
                  <option value="">Select a class</option>
                  <option value="hatha">Hatha Yoga</option>
                  <option value="vinyasa">Vinyasa Flow</option>
                  <option value="ashtanga">Ashtanga Yoga</option>
                  <option value="restorative">Restorative Yoga</option>
                  <option value="prenatal">Prenatal Yoga</option>
                  <option value="meditation">Meditation & Breathwork</option>
                  <option value="power">Power Yoga</option>
                  <option value="yin">Yin Yoga</option>
                </select>
              </div>

              <div>
                <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Testimonial
                </label>
                <textarea
                  id="testimonial"
                  name="testimonial"
                  rows={5}
                  className="glassmorphic w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yoga-sage"
                  placeholder="Share your yoga journey and experience with us..."
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Your Photo (Optional)
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="glassmorphic w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yoga-sage"
                />
              </div>

              <Button type="submit" className="w-full bg-yoga-sage hover:bg-yoga-leaf">
                Submit Review
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
