import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import AnimatedSection from "@/components/animated-section"
import { yogaProtocol, instructorInfo } from "@/lib/data"

const faqItems = [
  {
    question: "What is therapeutic yoga?",
    answer:
      "Therapeutic yoga is a practice designed to support physical, mental, and emotional healing. It uses gentle, tailored yoga techniques to address specific health issues, reduce pain, and promote overall well-being.",
  },
  {
    question: "Why choose Padmanaath Yog?",
    answer:
      "Learning yoga from the learned in the beautiful surroundings of Kokan brings out the best in every human being. Nature and cosmic energies assist in regaining, rejuvenation, and rehabilitation. Our approach combines authentic traditional practices with modern understanding to address contemporary health challenges.",
  },
  {
    question: "What are the benefits of yoga?",
    answer:
      "Yoga offers numerous benefits, including improved flexibility, strength, balance, and mental clarity. It can also reduce stress, enhance sleep quality, and promote overall well-being.",
  },
  {
    question: "Is yoga suitable for beginners?",
    answer:
      "Yes, yoga is suitable for beginners. Our classes are designed to accommodate all levels, and our instructors provide modifications to ensure everyone can participate safely and comfortably.",
  },
  {
    question: "What should I wear to a yoga class?",
    answer:
      "Wear comfortable, breathable clothing that allows you to move freely. Avoid clothing that is too tight or restrictive.",
  },
  {
    question: "What should I bring to a yoga class?",
    answer:
      "Bring a yoga mat, a towel, and a water bottle. We provide mats and towels for rent if you don't have your own.",
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container relative z-10 px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-yoga-burnt">
                Let us pay obeisance to Yog and its roots
              </h1>
              <div className="bullet-list text-left mb-8">
                <p className="text-lg md:text-xl mb-4 text-muted-foreground">
                  Yoga saadhana is as ancient as Indus civilisation. It draws its roots from:
                </p>
                <ul className="staggered-container pl-4">
                  <li className="staggered-item text-muted-foreground">Vedas and Upanishads</li>
                  <li className="staggered-item text-muted-foreground">Yog Vashishtha and Bhagavat Gita</li>
                  <li className="staggered-item text-muted-foreground">
                    Patanjali yog sutra, Gheranda Samhita, and Hatha yoga pradipika
                  </li>
                </ul>
              </div>
              <p className="text-lg mb-8 text-muted-foreground">
                As per Shiva Samhita, Lord Shiva is the originator of yoga. It traces its lineage through pre-vedic,
                vedic, classical, post classical to present period. Swami Vivekananda was instrumental in introducing
                yoga to the global mass.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button size="lg" className="bg-yoga-burnt hover:bg-yoga-lightorange">
                  Begin Your Journey
                </Button>
                <Link href="/therapeutic-yog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-yoga-burnt text-yoga-burnt hover:bg-yoga-burnt hover:text-white"
                  >
                    Explore Therapeutic Yog
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Ancient Yoga Practice"
                fill
                className="object-cover"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Yoga Roots Section */}
      <section className="section bg-yoga-cream">
        <div className="container">
          <AnimatedSection className="sanatan-border">
            <SectionHeader
              title="The Ancient Wisdom of Yoga"
              subtitle="Throughout history, countless sages have preserved and transmitted the ancient wisdom of Yoga, passing it down through generations."
            />

            <div className="mb-8 text-center">
              <p className="text-lg mb-4 text-muted-foreground">
                Despite challenges such as invasions and foreign rule, the practice has endured. Thanks to their
                unwavering dedication and sacrifices, we are now able to benefit from the profound teachings of Yoga in
                its current form.
              </p>
              <p className="text-lg font-medium text-yoga-burnt">
                Our salutations to all of them for their wisdom, sacrifice and service for enriching our lives.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 staggered-container">
              {yogaProtocol.components.slice(0, 4).map((component, index) => (
                <div key={index} className="sanatan-card staggered-item">
                  <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">{component.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                  <ul className="space-y-1">
                    {component.elements.slice(0, 4).map((element, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="mr-2 text-yoga-burnt">•</span>
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Therapeutic Yog Section */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-burnt">Therapeutic Yog</h2>

              <div className="mb-6">
                <p className="sanskrit-quote">समदोषः समाग्निश्च समधातु मलक्रियाः</p>
                <p className="sanskrit-translation">
                  A person who has balanced doshas (bodily humors), balanced agni (digestive fire), balanced dhatus
                  (bodily tissues), and proper excretion of waste products, whose mind, senses, and intellect are calm
                  and who is in a state of perfect health, is said to be in a state of health.
                </p>
              </div>

              <div className="bullet-list mb-6">
                <p className="mb-2 text-muted-foreground">
                  Finding your real self is yog. Connecting with nature is yog. Perfect body, mind and spirit wellness
                  is yog.
                </p>
                <ul className="staggered-container pl-4">
                  <li className="staggered-item text-muted-foreground">
                    Maintaining a fit body and an alert mind is essential for every human being
                  </li>
                  <li className="staggered-item text-muted-foreground">
                    An alert mind can only thrive in a healthy body
                  </li>
                  <li className="staggered-item text-muted-foreground">
                    Therefore, preserving optimal physical fitness is of utmost importance
                  </li>
                </ul>
              </div>

              <p className="mb-6 font-medium text-yoga-burnt">
                शरीरमाद्यं खलु धर्मसाधनम् - The body is the medium through which one performs their righteous duties.
              </p>
              <Link href="/therapeutic-yog">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">Learn More About Therapeutic Yog</Button>
              </Link>
            </AnimatedSection>
            <AnimatedSection
              direction="right"
              className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden order-1 md:order-2"
            >
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Therapeutic Yoga Practice"
                fill
                className="object-cover"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Padmanaath Yog Section */}
      <section className="section bg-yoga-burnt/10">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Padmanaath Yoga Practice"
                fill
                className="object-cover"
              />
            </AnimatedSection>
            <AnimatedSection direction="right">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-burnt">Padmanaath Yog</h2>
              <h3 className="text-xl mb-4 text-yoga-brown">Come to Padmanaath yog to achieve perfect health</h3>

              <div className="bullet-list mb-6">
                <p className="mb-2 text-muted-foreground">Modern challenges to health:</p>
                <ul className="staggered-container pl-4">
                  <li className="staggered-item text-muted-foreground">
                    Today's competitive world has pushed society to its limits
                  </li>
                  <li className="staggered-item text-muted-foreground">
                    Rampant air and water pollution has complicated matters further
                  </li>
                  <li className="staggered-item text-muted-foreground">Food on our plate too raises many questions</li>
                </ul>
              </div>

              <p className="mb-6 text-muted-foreground">
                Unhealthy daily routine, wrong diet habits, and lack of rest severely affect our systems. Each one of us
                is enduring many disorders.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-yoga-burnt">
                  Digestive system.. the root of all disorders
                </h4>
                <p className="mb-2 text-muted-foreground">
                  Unhealthy digestive system is the root cause of all other diseases and disorders.
                </p>
                <p className="mb-4 font-medium text-yoga-burnt">
                  सर्वरोगाः प्रजायन्ते जायन्ते मलसन्चयात् - All diseases arise due to the accumulation of waste products
                  (toxins) in the body.
                </p>
              </div>

              <Link href="/padmanaath-yog">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">Discover Padmanaath Yog</Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Yoga Protocol Section */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              title="Yoga Protocol at Padmanaath Yog"
              subtitle="A comprehensive approach combining ancient wisdom with modern understanding"
            />

            <div className="sanatan-border mb-8">
              <h3 className="text-xl font-semibold mb-4 text-yoga-burnt">Components of Our Yoga Protocol</h3>
              <p className="mb-6 text-muted-foreground">
                Basic canvas is Ashthanga yoga of Rishi Patanjali, Hatha yoga pradipika, Gherand Samhita and Bhagavat
                Gita. Deft mixture of other good practices from various sources like siddha system, Ayurveda and others.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium mb-3 text-yoga-burnt">Guiding Principles</h4>
                  <div className="flex flex-wrap gap-2">
                    {yogaProtocol.guidingPrinciples.map((principle, index) => (
                      <span key={index} className="text-sm px-3 py-1 bg-yoga-burnt/10 text-yoga-brown rounded-full">
                        {principle}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3 text-yoga-burnt">Benefits of Learning and Doing it Right</h4>
                  <p className="mb-2 font-medium text-yoga-burnt text-sm">
                    प्राणायामेन युक्तेन, सर्वरोगक्षयो भवेत् | अयुक्ताभ्यासयोगेन, सर्वरोगस्य संभवः
                  </p>
                  <p className="mb-4 text-sm text-muted-foreground">
                    By practicing Pranayama (breath control) properly, all diseases are destroyed. But by improper
                    practice, all diseases are possible.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    As pranayama is an essential integral part of yoga protocol, the same can be said for shatkarma,
                    asan, dhaarana, dhyaan, Samadhi, yog nidra, shavasan, and meditation.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 staggered-container">
              {yogaProtocol.benefits.map((benefit, index) => (
                <div key={index} className="sanatan-card staggered-item">
                  <h4 className="text-lg font-semibold mb-2 text-yoga-burnt">{benefit.level}</h4>
                  <p className="text-sm font-medium mb-2 text-yoga-brown">{benefit.sanskrit}</p>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/yoga-protocol">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">Explore Our Complete Protocol</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Meet Your Instructor Section */}
      <section className="section bg-yoga-cream">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={instructorInfo.image || "/placeholder.svg"}
                alt={`Yoga instructor ${instructorInfo.name}`}
                fill
                className="object-cover"
              />
            </AnimatedSection>
            <AnimatedSection direction="right">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-burnt">The Learned</h2>
              <h3 className="text-xl mb-4 text-yoga-brown">
                {instructorInfo.name}, {instructorInfo.title}
              </h3>
              <div className="bullet-list mb-6">
                <ul className="staggered-container pl-4">
                  <li className="staggered-item text-muted-foreground">{instructorInfo.age} years of age</li>
                  <li className="staggered-item text-muted-foreground">Chemical engineer of 1984</li>
                  <li className="staggered-item text-muted-foreground">
                    Self-employed entrepreneur with several registered patents
                  </li>
                  <li className="staggered-item text-muted-foreground">Practicing Yog for more than 20 years</li>
                </ul>
              </div>
              <p className="mb-6 text-muted-foreground">
                Learnt Yog under an array of masters, including distant yog from Dr. Mrs. Suman Seth in 1991, Yog
                teacher's course from Vashishtha yog ashram (2022), and certifications as a Yog protocol instructor and
                Yog therapist from Ayush Mantralaya.
              </p>
              <p className="mb-6 text-muted-foreground">
                Been propagating importance of Yog for healthy living in Bharat and abroad.
              </p>
              <Link href="/the-learned">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">
                  Learn More About {instructorInfo.name.split(" ")[2]}
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Find answers to common questions about Padmanaath Yog and our approach to wellness."
            />

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details key={index} className="sanatan-card group">
                    <summary className="list-none flex justify-between items-center cursor-pointer font-medium p-4">
                      {faq.question}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 group-open:rotate-180 transition-transform text-yoga-burnt"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section bg-yoga-cream">
        <div className="container max-w-4xl text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yoga-burnt">Ready to Begin Your Journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
              Join us at Padmanaath Yog and discover the transformative power of authentic yoga practices rooted in
              ancient wisdom.
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
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
