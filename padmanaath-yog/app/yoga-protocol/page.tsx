import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import { yogaProtocol } from "@/lib/data"

export const metadata = {
  title: "Yoga Protocol",
  description:
    "Explore our comprehensive yoga protocol combining ancient wisdom from Ashtanga Yoga, Hatha Yoga Pradipika, Gheranda Samhita, and more.",
}

export default function YogaProtocolPage() {
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-yoga-burnt">Yoga Protocol</h1>
          <p className="text-lg mb-8 text-muted-foreground">
            Our comprehensive yoga protocol draws from ancient texts and traditions, combining time-tested practices
            with modern understanding to create a holistic approach to health and wellness.
          </p>
        </div>
      </section>

      {/* Components Section */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Components of Our Yoga Protocol"
            subtitle="The foundation of our approach is built on these classical systems and texts."
          />

          <p className="text-center mb-8 text-muted-foreground">
            Basic canvas is Ashthanga yoga of Rishi Patanjali, Hatha yoga pradipika, Gherand Samhita and Bhagavat Gita.
            Deft mixture of other good practices from various sources like siddha system, Ayurveda and others.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yogaProtocol.components.map((component, index) => (
              <div key={index} className="sanatan-card">
                <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">{component.title}</h3>
                <p className="text-muted-foreground mb-4">{component.description}</p>
                <ul className="space-y-1">
                  {component.elements.map((element, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-yoga-burnt">•</span>
                      <span>{element}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Human Anatomy */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Understanding Human Anatomy</h2>
            <p className="mb-4 text-muted-foreground">
              Our protocol is based on a deep understanding of human anatomy, the mind-body-spirit connection, and how
              these elements relate to health and healthy living.
            </p>
            <p className="mb-6 text-muted-foreground">
              We integrate knowledge from both ancient yogic texts and modern scientific understanding to create
              practices that work with the body's natural systems and processes.
            </p>
            <div className="space-y-4">
              <div className="sanatan-border p-4">
                <h4 className="font-medium text-yoga-burnt mb-2">Physical Body (Annamaya Kosha)</h4>
                <p className="text-sm text-muted-foreground">
                  Understanding the musculoskeletal system, organs, and physiological processes to create safe and
                  effective practices.
                </p>
              </div>
              <div className="sanatan-border p-4">
                <h4 className="font-medium text-yoga-burnt mb-2">Energy Body (Pranamaya Kosha)</h4>
                <p className="text-sm text-muted-foreground">
                  Working with the subtle energy channels (nadis), energy centers (chakras), and vital life force
                  (prana).
                </p>
              </div>
              <div className="sanatan-border p-4">
                <h4 className="font-medium text-yoga-burnt mb-2">Mental-Emotional Body (Manomaya Kosha)</h4>
                <p className="text-sm text-muted-foreground">
                  Addressing the connection between mental states, emotions, and physical health through mindfulness
                  practices.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Human Anatomy and Yoga"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="bg-yoga-cream py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Guiding Principles"
            subtitle="Our protocol incorporates these essential practices to create a comprehensive approach to wellness."
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {yogaProtocol.guidingPrinciples.map((principle, index) => (
              <div key={index} className="sanatan-card flex items-center">
                <span className="text-yoga-burnt mr-3 text-xl">•</span>
                <span className="font-medium">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proper Practice */}
      <section className="container mb-16">
        <div className="sanatan-border">
          <SectionHeader
            title="The Importance of Proper Practice"
            subtitle="Correct technique is essential for experiencing the benefits of yoga and avoiding potential harm."
          />

          <div className="mb-8">
            <p className="sanskrit-quote">प्राणायामेन युक्तेन, सर्वरोगक्षयो भवेत् | अयुक्ताभ्यासयोगेन, सर्वरोगस्य संभवः</p>
            <p className="sanskrit-translation">
              (Prāṇāyāmena yuktēna, sarvarōgakṣayō bhavēt | Ayuktābhyāsayōgēna, sarvarōgasya sambhavaḥ)
            </p>
            <p className="text-center text-muted-foreground">
              By practicing Pranayama (breath control) properly, all diseases are destroyed. But by improper practice,
              all diseases are possible.
            </p>
          </div>

          <p className="text-center mb-6 text-muted-foreground">
            As pranayama is an essential integral part of yoga protocol, the same can be said for shatkarma, asan,
            dhaarana, dhyaan, Samadhi, yog nidra, shavasan, and meditation. Proper Yog increases strength, balance,
            flexibility, immunity, sleep quality, and overall health.
          </p>

          <div className="text-center mb-6">
            <p className="font-medium text-yoga-burnt">Hence it is essential to learn yog from the learned.</p>
          </div>
        </div>
      </section>

      {/* Four Levels of Benefits */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Four Levels of Benefits"
            subtitle="Our yoga protocol works on multiple levels to create comprehensive health benefits."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {yogaProtocol.benefits.map((benefit, index) => (
              <div key={index} className="sanatan-card">
                <h3 className="text-xl font-semibold mb-2 text-yoga-burnt">{benefit.level}</h3>
                <p className="font-medium text-yoga-brown mb-3">{benefit.sanskrit}</p>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customized Approach */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Customized Yoga Practice"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Customized Protocols</h2>
            <p className="mb-4 text-muted-foreground">
              At Padmanaath Yog, we recognize that each individual is unique, with different constitutions, health
              concerns, and goals. Therefore, our protocols are customized to each person's needs, abilities, targets,
              and inclinations.
            </p>
            <p className="mb-6 text-muted-foreground">
              Through careful assessment and ongoing observation, we create and refine personalized practices that
              address your specific situation and support your journey to optimal health.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Individual Assessment</h4>
                  <p className="text-muted-foreground">
                    Thorough evaluation of your current health status and specific needs
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Tailored Practices</h4>
                  <p className="text-muted-foreground">
                    Selection of specific techniques most beneficial for your situation
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Progressive Adaptation</h4>
                  <p className="text-muted-foreground">
                    Ongoing refinement of your protocol as you progress and your needs change
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-cream py-16 rounded-2xl">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Experience Our Yoga Protocol</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Discover the transformative power of our comprehensive yoga protocol under the guidance of experienced
            practitioners. Begin your journey to holistic health and wellness today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-yoga-burnt hover:bg-yoga-lightorange">
              Book a Session
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
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

