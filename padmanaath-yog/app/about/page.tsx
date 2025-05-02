import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import { instructorInfo } from "@/lib/data"

export const metadata = {
  title: "About Our Yoga Studio & Instructor",
  description:
    "Learn about Maya Peterson, our experienced yoga instructor, and the philosophy behind Serenity Yoga Studio.",
}

export default function AboutPage() {
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="mb-6 text-yoga-leaf">About Our Studio</h1>
            <p className="text-lg mb-6 text-muted-foreground">
              Welcome to Serenity Yoga, where ancient wisdom meets modern practice. Our studio was founded with the
              vision of creating a sanctuary where everyone can explore the transformative power of yoga in a
              supportive, inclusive environment.
            </p>
            <p className="mb-8 text-muted-foreground">
              Whether you're a complete beginner or an experienced practitioner, our diverse classes cater to all
              levels, helping you develop strength, flexibility, balance, and inner peace.
            </p>
            <Link href="/classes">
              <Button className="bg-yoga-sage hover:bg-yoga-leaf">Explore Our Classes</Button>
            </Link>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Serenity Yoga Studio"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-yoga-mint/10 py-16 mb-16">
        <div className="container">
          <SectionHeader
            title="Our Mission & Values"
            subtitle="At Serenity Yoga, we're guided by these core principles in everything we do."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">Inclusivity</h3>
              <p className="text-muted-foreground">
                We believe yoga is for everybody and every body. Our studio welcomes practitioners of all ages,
                backgrounds, body types, and experience levels.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">Authenticity</h3>
              <p className="text-muted-foreground">
                We honor yoga's ancient roots while making it accessible for modern practitioners. Our teaching
                integrates traditional wisdom with contemporary understanding.
              </p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-3 text-yoga-leaf">Growth</h3>
              <p className="text-muted-foreground">
                We encourage continuous learning and self-exploration. Yoga is a lifelong journey, and we provide the
                guidance and support for practitioners to evolve at their own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Bio */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-yoga-leaf">Meet Your Instructor</h2>
            <h3 className="text-xl mb-4 text-yoga-sage">
              {instructorInfo.name}, {instructorInfo.title}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              {instructorInfo.bio.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden order-1 md:order-2">
            <Image
              src={instructorInfo.image || "/placeholder.svg"}
              alt={instructorInfo.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-yoga-lavender/10 py-16 mb-16">
        <div className="container">
          <SectionHeader
            title="Certifications & Training"
            subtitle="Comprehensive education and continuous learning ensure our teaching is always evolving."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glassmorphic p-6">
              <h3 className="text-xl font-semibold mb-4 text-yoga-leaf">Certifications</h3>
              <ul className="space-y-2 text-muted-foreground">
                {instructorInfo.certifications.map((cert, index) => (
                  <li key={index} className="flex flex-col">
                    <span className="font-medium text-yoga-sage">{cert.title}</span>
                    <span className="text-sm">{cert.institution}</span>
                    <span className="text-sm text-muted-foreground">{cert.year}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glassmorphic p-6">
              <h3 className="text-xl font-semibold mb-4 text-yoga-leaf">Teaching Philosophy</h3>
              <p className="text-muted-foreground">{instructorInfo.philosophy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Space */}
      <section className="container mb-16">
        <SectionHeader
          title="Our Studio Space"
          subtitle="A peaceful sanctuary designed to help you disconnect from the outside world and connect with your inner self."
        />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Main Yoga Room" fill className="object-cover" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <h4 className="text-white font-medium">Main Practice Room</h4>
            </div>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Meditation Space" fill className="object-cover" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <h4 className="text-white font-medium">Meditation Space</h4>
            </div>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Lobby & Tea Area" fill className="object-cover" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
              <h4 className="text-white font-medium">Lobby & Tea Area</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-cream py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-leaf">Ready to Begin Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join us for a class and experience the Serenity Yoga difference. Your first class is on us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-yoga-sage hover:bg-yoga-leaf">
              Book a Free Session
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-yoga-sage text-yoga-sage hover:bg-yoga-sage hover:text-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
