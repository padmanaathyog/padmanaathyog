import Link from "next/link"
import SectionHeader from "@/components/section-header"
import ClassCard from "@/components/class-card"
import { yogaClasses } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Yoga Classes & Courses",
  description:
    "Explore our diverse range of yoga classes for all levels - from gentle beginners classes to advanced practices.",
}

// Group classes by level
const beginnerClasses = yogaClasses.filter((c) => c.level === "Beginner" || c.level === "All Levels")
const intermediateClasses = yogaClasses.filter((c) => c.level === "Intermediate" || c.level === "All Levels")
const advancedClasses = yogaClasses.filter((c) => c.level === "Advanced" || c.level === "Intermediate/Advanced")
const specialtyClasses = yogaClasses.filter((c) => c.level === "Specialized" || c.level === "All Levels")

export default function ClassesPage() {
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-yoga-leaf">Classes & Courses</h1>
          <p className="text-lg mb-8 text-muted-foreground">
            From gentle beginners classes to dynamic advanced practices, we offer a wide range of yoga styles to support
            your unique journey. All classes are taught by experienced, certified instructors in a welcoming
            environment.
          </p>
        </div>
      </section>

      {/* Class Filtering */}
      <section className="container mb-16">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="glassmorphic">
              <TabsTrigger value="all">All Classes</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="specialty">Specialty</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {yogaClasses.map((yogaClass) => (
                <ClassCard key={yogaClass.id} {...yogaClass} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beginner">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beginnerClasses.map((yogaClass) => (
                <ClassCard key={yogaClass.id} {...yogaClass} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intermediate">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {intermediateClasses.map((yogaClass) => (
                <ClassCard key={yogaClass.id} {...yogaClass} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedClasses.map((yogaClass) => (
                <ClassCard key={yogaClass.id} {...yogaClass} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specialty">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialtyClasses.map((yogaClass) => (
                <ClassCard key={yogaClass.id} {...yogaClass} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Pricing Section */}
      <section className="bg-yoga-mint/10 py-16 mb-16">
        <div className="container">
          <SectionHeader
            title="Class Packages & Pricing"
            subtitle="Flexible options to fit your schedule and budget."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Drop-In</h3>
              <div className="text-3xl font-bold my-4 text-yoga-leaf">$18</div>
              <p className="text-muted-foreground mb-6">Perfect for trying out a new class or occasional visits.</p>
              <Button className="w-full bg-yoga-sage hover:bg-yoga-leaf">Book Now</Button>
            </div>

            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yoga-sage text-white px-4 py-1 text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">10-Class Pack</h3>
              <div className="text-3xl font-bold my-4 text-yoga-leaf">$150</div>
              <p className="text-muted-foreground mb-6">$15 per class. Valid for 3 months from purchase date.</p>
              <Button className="w-full bg-yoga-sage hover:bg-yoga-leaf">Purchase</Button>
            </div>

            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Monthly Unlimited</h3>
              <div className="text-3xl font-bold my-4 text-yoga-leaf">$120</div>
              <p className="text-muted-foreground mb-6">
                Unlimited classes for a full month. Best value for regular practice.
              </p>
              <Button className="w-full bg-yoga-sage hover:bg-yoga-leaf">Subscribe</Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">
              We also offer private sessions and specialized workshops. Contact us for more information.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-yoga-sage text-yoga-sage hover:bg-yoga-sage hover:text-white">
                Contact for Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mb-16">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before joining a class."
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            <details className="glassmorphic p-6 group">
              <summary className="list-none flex justify-between items-center cursor-pointer font-medium">
                What should I bring to class?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-muted-foreground">
                <p>
                  While we provide mats and props, many students prefer to bring their own yoga mat. We recommend
                  wearing comfortable, breathable clothing that allows for a full range of motion. Bring a water bottle
                  and a small towel if you tend to sweat. For meditation classes, you might want to bring a light shawl
                  or sweater as body temperature can drop during stillness.
                </p>
              </div>
            </details>

            <details className="glassmorphic p-6 group">
              <summary className="list-none flex justify-between items-center cursor-pointer font-medium">
                How early should I arrive for class?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-muted-foreground">
                <p>
                  We recommend arriving 10-15 minutes before your first class to complete any necessary paperwork and
                  get oriented to the studio. For returning students, arriving 5-10 minutes early allows time to set up
                  your space and center yourself before practice begins. Our studio doors close precisely at class start
                  time to maintain a distraction-free environment.
                </p>
              </div>
            </details>

            <details className="glassmorphic p-6 group">
              <summary className="list-none flex justify-between items-center cursor-pointer font-medium">
                I'm not flexible. Can I still do yoga?
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 text-muted-foreground">
                <p>
                  The common misconception is that you need to be flexible to start yoga, but in reality, yoga helps
                  develop flexibility over time. Our instructors offer modifications for all levels and body types. Yoga
                  is about working with your body as it is today, not forcing it into positions it's not ready for. With
                  consistent practice, you'll likely notice improvements in flexibility, strength, and overall
                  well-being.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-lavender/20 py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-yoga-leaf">Ready to Start Your Practice?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join us for a class and experience the transformative power of yoga in a supportive environment.
          </p>
          <Button size="lg" className="bg-yoga-sage hover:bg-yoga-leaf">
            Book Your First Class
          </Button>
        </div>
      </section>
    </div>
  )
}

