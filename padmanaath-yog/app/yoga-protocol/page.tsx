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
  const googleFormContactLink = process.env.NEXT_PUBLIC_CONTACT_FORM_URL
  const googleFormBookLink = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL

  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-yoga-burnt">Yog Protocol</h1>
          <p className="text-lg mb-8 text-muted-foreground">
            Our comprehensive yog protocol draws from ancient texts and traditions, combining time-tested practices with
            modern understanding to create a holistic approach to health and wellness.
          </p>
        </div>
      </section>

      {/* Components Section */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Components of Our Yog Protocol"
            subtitle="The foundation of our approach is built on these classical systems and texts."
          />

          <p className="text-center mb-8 text-muted-foreground">
            Basic canvas is Ashthanga yog of Rishi Patanjali, Hatha yog pradipika, Gherand Samhita and Bhagavat Gita.
            Deft mixture of other good practices from various sources like siddha system, Ayurveda and others.
          </p>

          <div className="sanatan-card mb-8">
            <h3 className="text-xl font-semibold mb-4 text-yoga-burnt">The Essence of Yog Protocol</h3>
            <p className="text-muted-foreground mb-4">
              Our protocol integrates the wisdom of ancient texts with modern scientific understanding to create a
              comprehensive approach to wellness. The practice encompasses physical postures, breath control,
              meditation, ethical principles, and lifestyle recommendations.
            </p>
            <p className="text-muted-foreground mb-4">
              This holistic system addresses all aspects of human existence—physical, mental, emotional, and
              spiritual—creating balance and harmony within the individual and with the surrounding world.
            </p>
            <p className="text-muted-foreground">
              Through regular practice under proper guidance, practitioners experience improved health, enhanced mental
              clarity, emotional stability, and spiritual growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Foundational Practices</h3>
              <p className="text-muted-foreground mb-4">
                The core practices that form the foundation of our protocol include:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Yama & Niyama:</strong> Ethical principles and personal
                    observances that guide behavior and lifestyle
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Asana:</strong> Physical postures that develop strength,
                    flexibility, and balance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Pranayama:</strong> Breath control techniques that regulate
                    vital energy
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Pratyahara:</strong> Withdrawal of the senses to prepare for
                    meditation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Dharana & Dhyana:</strong> Concentration and meditation
                    practices
                  </span>
                </li>
              </ul>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Supportive Practices</h3>
              <p className="text-muted-foreground mb-4">Additional practices that enhance the core protocol include:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Shatkarma:</strong> Cleansing techniques that purify the body
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Mudra & Bandha:</strong> Energy locks and gestures that direct
                    and conserve energy
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Yoga Nidra:</strong> Conscious deep relaxation for restoration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Mantra:</strong> Sacred sounds that focus the mind
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-yoga-burnt">•</span>
                  <span>
                    <strong className="text-yoga-brown">Ayurvedic Principles:</strong> Dietary and lifestyle
                    recommendations based on individual constitution
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Human Anatomy */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Understanding Human Anatomy</h2>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">The Five-Layered Self (Pancha Kosha)</h4>
                  <p className="text-muted-foreground">
                    Yogic anatomy recognizes five interconnected layers of existence: physical body (Annamaya Kosha), energy body (Pranamaya Kosha), mental body (Manomaya Kosha), wisdom body (Vijnanamaya Kosha), and bliss body (Anandamaya Kosha).
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Energy Channels (Nadis)</h4>
                  <p className="text-muted-foreground">
                    The subtle body contains thousands of energy channels (nadis) through which prana (life force) flows. The three main channels are Ida (left, cooling), Pingala (right, warming), and Sushumna (central channel).
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Energy Centers (Chakras)</h4>
                  <p className="text-muted-foreground">
                    Seven main energy centers align along the spine, from the base (Muladhara) to the crown (Sahasrara). Each chakra governs specific physical, emotional, and spiritual aspects of our being.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Mind-Body Connection</h4>
                  <p className="text-muted-foreground">
                    Yogic science recognizes the intimate connection between mental states and physical health. Stress, emotions, and thought patterns directly impact our physiological functions and overall wellbeing.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Constitutional Types (Doshas)</h4>
                  <p className="text-muted-foreground">
                    Drawing from Ayurveda, we recognize individual constitutional differences (Vata, Pitta, Kapha) that influence physical characteristics, tendencies, and optimal practices for each person.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/Human Anatomy and Yoga.png?height=500&width=800"
              alt="Human Anatomy and Yog"
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
            subtitle="Correct technique is essential for experiencing the benefits of yog and avoiding potential harm."
          />

          <div className="mb-8">
            <p className="sanskrit-quote">प्राणायामेन युक्तेन, सर्वरोगक्षयो भवेत्</p>
            <p className="sanskrit-quote">अयुक्ताभ्यासयोगेन, सर्वरोगस्य संभवः</p>
            <p className="text-center text-yoga-burnt italic">
              (Prāṇāyāmena yuktēna, sarvarōgakṣayō bhavēt | Ayuktābhyāsayōgēna, sarvarōgasya sambhavaḥ)
            </p>
            <p className="text-center text-yoga-burnt font-semibold mt-4 bg-yoga-cream/50 p-4 rounded-lg border border-yoga-burnt/20">
              By practicing Pranayama (breath control) properly, all diseases are destroyed. But by improper practice,
              all diseases are possible.
            </p>
          </div>

          <p className="text-center mb-6 text-muted-foreground">
            As pranayama is an essential integral part of yog protocol, the same can be said for shatkarma, asan,
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
            subtitle="Our yog protocol works on multiple levels to create comprehensive health benefits."
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
              src="/Customized Yoga Practice.png?height=500&width=800"
              alt="Customized Yog Practice"
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
          <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Experience Our Yog Protocol</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Discover the transformative power of our comprehensive yog protocol under the guidance of experienced
            practitioners. Begin your journey to holistic health and wellness today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={googleFormBookLink || ""} target="_blank" passHref>
              <Button size="lg" className="bg-yoga-burnt hover:bg-yoga-lightorange w-full">
                Book a Session
              </Button>
            </Link>
            <Link href={googleFormContactLink || ""} target="_blank" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white w-full"
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
