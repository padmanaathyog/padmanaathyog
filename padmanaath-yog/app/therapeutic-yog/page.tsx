import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"

export const metadata = {
  title: "Therapeutic Yog",
  description:
    "Discover the healing power of therapeutic yoga practices rooted in ancient Sanatan traditions. Address specific health concerns through tailored yoga protocols.",
}

export default function TherapeuticYogPage() {
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-yoga-burnt">Therapeutic Yog</h1>
          <div className="mb-8">
            <p className="sanskrit-quote">समदोषः समाग्निश्च समधातु मलक्रियाः</p>
            <p className="sanskrit-quote">प्रसन्नात्मेंद्रियमनः स्वस्थ इत्यभिधीयते</p>
            <p className="sanskrit-translation">
              (Samadoshaḥ samāgniśca samadhātu malakriyāḥ.. Prasannātma-indriya-manaḥ svastha ittyabhidhīyate)
            </p>
            <p className="text-lg text-muted-foreground">
              A person who has balanced doshas (bodily humors), balanced agni (digestive fire), balanced dhatus (bodily
              tissues), and proper excretion of waste products, whose mind, senses, and intellect are calm and who is in
              a state of perfect health, is said to be in a state of health.
            </p>
          </div>
        </div>
      </section>

      {/* What is Yog Section */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="What is Yog?"
            subtitle="Yoga is not merely a physical exercise but a comprehensive approach to holistic wellbeing."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Finding Your Real Self</h3>
              <p className="text-muted-foreground">
                Yoga is a journey of self-discovery, helping you connect with your true nature beyond the physical body
                and fluctuating mind.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Connecting with Nature</h3>
              <p className="text-muted-foreground">
                Yoga helps establish harmony between your inner nature and the cosmic forces, creating balance and
                alignment.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Perfect Body, Mind & Spirit Wellness</h3>
              <p className="text-muted-foreground">
                Yoga addresses all dimensions of human existence, creating integration and wholeness across physical,
                mental, and spiritual aspects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Importance of Physical Wellness */}
      <section className="container mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Physical Wellness Through Yoga"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">The Foundation of Wellness</h2>
            <p className="mb-4 text-muted-foreground">
              Maintaining a fit body and an alert mind is essential for every human being. An alert mind can only thrive
              in a healthy body. Therefore, preserving optimal physical fitness is of utmost importance.
            </p>
            <div className="sanatan-border p-4 mb-6">
              <p className="text-center font-medium text-yoga-burnt">शरीरमाद्यं खलु धर्मसाधनम्</p>
              <p className="text-center text-sm text-muted-foreground">(Shariramadhyam khalu dharma sadhanam)</p>
              <p className="text-center text-muted-foreground mt-2">
                The body is the medium through which one performs their righteous duties.
              </p>
            </div>
            <p className="text-lg font-medium text-yoga-burnt mb-6">
              Yog not only adds years to life but also adds life to years.
            </p>
          </div>
        </div>
      </section>

      {/* Therapeutic Approach */}
      <section className="bg-yoga-cream py-16 mb-16 rounded-2xl">
        <div className="container">
          <SectionHeader
            title="Our Therapeutic Approach"
            subtitle="Padmanaath Yog offers a comprehensive therapeutic approach rooted in ancient wisdom and adapted for modern health challenges."
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Personalized Assessment</h3>
              <p className="text-muted-foreground mb-4">
                We begin with a thorough assessment of your current health status, considering physical conditions,
                mental state, lifestyle factors, and specific health concerns.
              </p>
              <p className="text-muted-foreground">
                This holistic evaluation helps us understand the root causes of imbalances rather than just addressing
                symptoms.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Customized Protocol</h3>
              <p className="text-muted-foreground mb-4">
                Based on your assessment, we design a personalized yoga protocol that addresses your specific needs,
                incorporating appropriate asanas, pranayama techniques, meditation practices, and lifestyle
                recommendations.
              </p>
              <p className="text-muted-foreground">
                Each protocol is tailored to your current abilities and gradually adjusted as you progress.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Holistic Integration</h3>
              <p className="text-muted-foreground mb-4">
                Our approach integrates various aspects of traditional yoga with complementary practices from Ayurveda
                and other ancient healing systems.
              </p>
              <p className="text-muted-foreground">
                This comprehensive methodology addresses physical, mental, emotional, and spiritual dimensions of
                health.
              </p>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Progressive Guidance</h3>
              <p className="text-muted-foreground mb-4">
                We provide ongoing guidance and support as you progress in your practice, making adjustments to your
                protocol as needed to address changing needs and evolving health status.
              </p>
              <p className="text-muted-foreground">
                Regular follow-ups ensure that you're practicing correctly and experiencing the intended benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Conditions */}
      <section className="container mb-16">
        <SectionHeader
          title="Health Conditions We Address"
          subtitle="Our therapeutic yoga protocols can help with a wide range of health concerns."
        />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Digestive Disorders</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Irritable Bowel Syndrome (IBS)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Acid Reflux (GERD)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Constipation & Bloating</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Poor Digestion & Absorption</span>
              </li>
            </ul>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Musculoskeletal Issues</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Back Pain & Sciatica</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Arthritis & Joint Pain</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Poor Posture & Alignment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Muscle Tension & Stiffness</span>
              </li>
            </ul>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Stress-Related Conditions</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Anxiety & Depression</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Insomnia & Sleep Disorders</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Fatigue & Low Energy</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Headaches & Migraines</span>
              </li>
            </ul>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Respiratory Conditions</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Asthma & Allergies</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Chronic Bronchitis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Shallow Breathing</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Reduced Lung Capacity</span>
              </li>
            </ul>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Metabolic Disorders</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Diabetes & Pre-diabetes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Thyroid Imbalances</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Weight Management Issues</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Metabolic Syndrome</span>
              </li>
            </ul>
          </div>

          <div className="sanatan-card">
            <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">Cardiovascular Health</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Hypertension</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Poor Circulation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Cardiac Rehabilitation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-yoga-burnt">•</span>
                <span>Heart Health Maintenance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-burnt/10 py-16 rounded-2xl">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">Begin Your Healing Journey</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Experience the transformative power of therapeutic yoga under the guidance of experienced practitioners. Our
            personalized approach addresses your specific health concerns and supports your journey to holistic
            wellness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-yoga-burnt hover:bg-yoga-lightorange">
              Book a Consultation
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

