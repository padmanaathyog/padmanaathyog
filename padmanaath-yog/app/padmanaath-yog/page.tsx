import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"

export const metadata = {
  title: "Padmanaath Yog",
  description:
    "Discover Padmanaath Yog, a comprehensive approach to wellness focusing on digestive health as the foundation for overall wellbeing.",
}

export default function PadmanaathYogPage() {
  const googleFormContactLink = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  const googleFormBookLink = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-yoga-burnt">Padmanaath Yog</h1>
          <p className="text-xl font-medium mb-4 text-yoga-brown">Come to Padmanaath Yog to achieve perfect health</p>
          <p className="text-lg mb-8 text-muted-foreground">
            A comprehensive approach to wellness that addresses the root causes of health issues through traditional
            yogic practices focused on digestive health and overall balance.
          </p>
        </div>
      </section>

      {/* Modern Challenges Section */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Modern Challenges to Health"
            subtitle="Today's lifestyle creates numerous obstacles to maintaining optimal health."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Competitive World</h3>
              <p className="text-muted-foreground">
                Today's competitive world has pushed society to its limits, creating chronic stress that affects all
                body systems and disrupts natural balance.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Environmental Pollution</h3>
              <p className="text-muted-foreground">
                Rampant air and water pollution has complicated matters further, introducing toxins that our bodies must
                constantly work to eliminate.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Food Quality</h3>
              <p className="text-muted-foreground">
                Food on our plate raises many questions about nutrition, additives, processing methods, and agricultural
                practices that affect our health.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Lifestyle Factors</h3>
              <p className="text-muted-foreground">
                Unhealthy daily routines, wrong diet habits, and lack of rest severely affect our systems, creating
                imbalances that manifest as various disorders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Digestive System Section */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Digestive System: The Root of All Disorders</h2>
            <p className="mb-4 text-muted-foreground">
              Unhealthy digestive system is the root cause of all other diseases and disorders. When digestion is
              compromised, it affects nutrient absorption, waste elimination, and overall energy levels.
            </p>

            <div className="sanatan-border p-4 mb-6">
              <p className="text-center font-medium text-yoga-burnt">सर्वरोगाः प्रजायन्ते जायन्ते मलसन्चयात्</p>
              <p className="text-center text-sm text-muted-foreground">
                (Sarva rogaaḥ prajāyante jāyante malasanchayāt)
              </p>
              <p className="text-center text-muted-foreground mt-2">
                All diseases arise due to the accumulation of waste products (toxins) in the body.
              </p>
            </div>

            <p className="mb-6 text-muted-foreground">
              Common digestive system disorders include lack of appetite, dysphagia, GERD, ulcers, bloating, flatulence,
              IBS, and constipation. Correcting digestive system function is essential for healthy living.
            </p>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Digestive System Health"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Padmanaath Approach */}
      <section className="bg-yoga-cream py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="The Padmanaath Approach"
            subtitle="Our unique methodology addresses digestive health as the foundation for overall wellness."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Root Cause Analysis</h3>
              <p className="text-muted-foreground">
                Rather than treating symptoms, we identify and address the underlying causes of health issues,
                particularly focusing on digestive function and elimination of toxins.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Holistic Integration</h3>
              <p className="text-muted-foreground">
                We combine traditional yogic practices with principles from Ayurveda and other ancient healing systems
                to create a comprehensive approach to health restoration.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Personalized Protocols</h3>
              <p className="text-muted-foreground">
                Each individual receives a customized protocol based on their specific health concerns, constitution,
                and lifestyle factors, ensuring optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Benefits of Padmanaath Yog"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Benefits of Padmanaath Yog</h2>
            <p className="mb-4 text-muted-foreground">
              Our approach offers comprehensive benefits that address both immediate health concerns and long-term
              wellness goals.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Improved Digestive Function</h4>
                  <p className="text-muted-foreground">Enhanced digestion, absorption, and elimination processes</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Reduced Inflammation</h4>
                  <p className="text-muted-foreground">
                    Decreased systemic inflammation that contributes to various disorders
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Balanced Energy</h4>
                  <p className="text-muted-foreground">Improved energy levels and reduced fatigue</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Enhanced Immunity</h4>
                  <p className="text-muted-foreground">Strengthened immune function and disease resistance</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-yoga-burnt text-xl">•</span>
                <div>
                  <h4 className="font-medium text-yoga-brown">Mental Clarity</h4>
                  <p className="text-muted-foreground">Improved cognitive function and emotional balance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Unique Environment */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="The Healing Environment"
            subtitle="Our location in Kokan enhances the therapeutic benefits of our practices."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Natural Surroundings</h3>
              <p className="text-muted-foreground mb-4">
                Nestled in the scenic beauty of Kokan (Maharashtra), our main therapy center in Jamsut offers an ideal
                environment for healing and rejuvenation.
              </p>
              <p className="text-muted-foreground">
                Located just 5-10 km from the beautiful beaches of Hedavi, Velneshwar, and Bamanghal, the center
                provides access to natural beauty that enhances the yoga experience.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Pure Elements</h3>
              <p className="text-muted-foreground mb-4">
                The area offers plenty of clean air, sunlight, and water - essential elements that support the healing
                process and enhance the benefits of yoga practice.
              </p>
              <p className="text-muted-foreground">
                These natural elements create an environment free from the pollution and stress of urban settings,
                allowing for deeper healing and transformation.
              </p>
            </div>
          </div>
          {/* extra pics of padmantah yog will be added when the lab starts  */}
          {/* <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Kokan Coastline" fill className="object-cover" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white font-medium">Coastal Beauty</h4>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Natural Surroundings"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white font-medium">Lush Greenery</h4>
              </div>
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Yoga Practice Area"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4">
                <h4 className="text-white font-medium">Practice Spaces</h4>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Complementary Activities */}
      <section className="container mb-16">
        <SectionHeader
          title="Complementary Activities"
          subtitle="Enhance your yoga practice with these enriching experiences available in and around our center."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Spiritual Excursions</h3>
            <p className="text-muted-foreground">
              Visit many old and heritage temples around the place, including Lote Parashuram, Hedavi Ganapati,
              Velneshwar, Guhaghar, and Bamanghal.
            </p>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Bird Watching</h3>
            <p className="text-muted-foreground">
              This place is home to exotic birds, offering opportunities to connect with nature and observe wildlife in
              their natural habitat.
            </p>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Star Gazing</h3>
            <p className="text-muted-foreground">
              On clear sky days, one can see stars and galaxies with naked eyes - a luxury lost to city dwellers and the
              present generation.
            </p>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Rain Watching</h3>
            <p className="text-muted-foreground">
              During rainy days, doing yoga with pouring rain is an experience one will savor for a lifetime, creating a
              unique connection with natural elements.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-cream py-16 rounded-2xl">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Experience Padmanaath Yog</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join us for a transformative journey to optimal health through our unique approach to yoga and wellness.
            Address the root causes of health issues and discover a new level of vitality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={googleFormBookLink || ""} target="_blank" passHref>
                <Button
                  size="lg"
                  className="bg-yoga-burnt hover:bg-yoga-lightorange w-full"
                >
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
