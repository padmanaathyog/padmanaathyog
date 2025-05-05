import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/section-header";
import { instructorInfo } from "@/lib/data";

export const metadata = {
  title: "The Learned - Yog Sadhak Umesh",
  description:
    "Learn about Yog Sadhak Umesh, a certified yoga therapist with over 20 years of experience in traditional yogic practices.",
};

export default function TheLearnedPage() {
  const googleFormContactLink = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
  const googleFormBookLink = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;
  return (
    <div className="page-padding">
      {/* Hero Section */}
      <section className="container mb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
        <h1 className="mb-6 text-yoga-burnt">The Learned</h1>
        <h2 className="text-2xl mb-4 text-yoga-brown">
          {instructorInfo.name}
        </h2>
        <p className="text-xl mb-2 text-yoga-burnt">
          {instructorInfo.title}
        </p>
        <p className="mb-6 text-muted-foreground">
          {instructorInfo.age} years of age. Chemical engineer of 1984.
          Self-employed entrepreneur with several registered patents.
        </p>
        <p className="text-lg font-medium text-yoga-brown">
          Practicing Yog for more than 20 years.
        </p>
        </div>
        <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={"/the leanred.jpg?height=500&width=800"}
          alt={instructorInfo.name}
          fill
          className="object-cover"
        />
        </div>
      </div>
      </section>

      {/* Biography Section */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
      <div className="container">
        <SectionHeader
        title="Biography"
        subtitle="The journey of a dedicated yog practitioner and teacher."
        />

        <div className="sanatan-card">
        <div className="space-y-4 text-muted-foreground">
          {instructorInfo.bio.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
          ))}
        </div>
        </div>
      </div>
      </section>

      {/* Certifications Timeline */}
      <section className="container mb-16">
      <SectionHeader
        title="Yog Education & Certifications"
        subtitle="A journey of continuous learning and growth in the field of yog."
      />

      <div className="relative border-l-2 border-yoga-burnt/30 pl-8 ml-4 space-y-10">
        {instructorInfo.certifications.map((cert, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[42px] top-0 h-8 w-8 rounded-full bg-yoga-burnt flex items-center justify-center">
          <span className="text-white font-bold">{index + 1}</span>
          </div>
          <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-2 text-yoga-burnt">
            {cert.title}
          </h3>
          <p className="text-yoga-brown mb-1">{cert.institution}</p>
          <p className="text-muted-foreground mb-2">{cert.year}</p>
          {cert.teacher && (
            <p className="text-sm text-muted-foreground">
            Teacher: {cert.teacher}
            </p>
          )}
          {cert.center && (
            <p className="text-sm text-muted-foreground">
            Center: {cert.center}
            </p>
          )}
          </div>
        </div>
        ))}
      </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="bg-yoga-cream py-16 mb-16 rounded-2xl">
      <div className="container">
        <SectionHeader
        title="Teaching Philosophy"
        subtitle="The principles and values that guide Yog Sadhak Umesh's approach to teaching."
        />

        <div className="sanatan-card">
        <p className="text-muted-foreground">{instructorInfo.philosophy}</p>
        </div>
      </div>
      </section>

      {/* Global Reach */}
      <section className="container mb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
        <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">
          Global Reach
        </h2>
        <p className="mb-4 text-muted-foreground">
          Yog Sadhak Umesh has been propagating the importance of Yog for
          healthy living both in Bharat and abroad. His teachings have
          reached students across different countries, spreading the
          authentic wisdom of traditional yog practices.
        </p>
        <p className="mb-6 text-muted-foreground">
          Through workshops, retreats, and online sessions, he has made
          these ancient practices accessible to a global audience, helping
          people from diverse backgrounds experience the transformative
          benefits of yog.
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
          <span className="mr-3 text-yoga-burnt text-xl">•</span>
          <div>
            <h4 className="font-medium text-yoga-brown">
            Workshops & Retreats
            </h4>
            <p className="text-muted-foreground">
            Conducted in various locations across India and
            internationally
            </p>
          </div>
          </div>
          <div className="flex items-start">
          <span className="mr-3 text-yoga-burnt text-xl">•</span>
          <div>
            <h4 className="font-medium text-yoga-brown">
            Online Teaching
            </h4>
            <p className="text-muted-foreground">
            Making yog accessible to students regardless of
            geographical location
            </p>
          </div>
          </div>
          <div className="flex items-start">
          <span className="mr-3 text-yoga-burnt text-xl">•</span>
          <div>
            <h4 className="font-medium text-yoga-brown">
            Community Outreach
            </h4>
            <p className="text-muted-foreground">
            Bringing yog to underserved communities and special
            populations
            </p>
          </div>
          </div>
        </div>
        </div>
        <div className="relative h-80 md:h-[500px] rounded-2xl overflow-hidden">
        <Image
          src="/global reach b.JPG?height=500&width=800"
          alt="Global Yog Teaching"
          fill
          className="object-cover"
        />
        </div>
      </div>
      </section>

      {/* Specializations */}
      <section className="bg-yoga-burnt/10 py-16 mb-16 rounded-2xl">
      <div className="container">
        <SectionHeader
        title="Areas of Specialization"
        subtitle="Yog Sadhak Umesh has developed expertise in these specific areas of yog practice and therapy."
        />

        <div className="grid md:grid-cols-3 gap-8">
        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Digestive Health
          </h3>
          <p className="text-muted-foreground">
          Specialized protocols for addressing various digestive disorders
          and optimizing digestive function as the foundation for overall
          health.
          </p>
        </div>

        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Traditional Pranayama
          </h3>
          <p className="text-muted-foreground">
          Advanced breathing techniques from classical texts, taught with
          precision and adapted for individual needs and conditions.
          </p>
        </div>

        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Shatkarma
          </h3>
          <p className="text-muted-foreground">
          The six purification techniques of Hatha Yog that cleanse the
          body and prepare it for deeper practices.
          </p>
        </div>

        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Yog for Chronic Conditions
          </h3>
          <p className="text-muted-foreground">
          Therapeutic applications of yog for managing and improving
          various chronic health conditions.
          </p>
        </div>

        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Meditation & Mindfulness
          </h3>
          <p className="text-muted-foreground">
          Techniques for developing mental clarity, emotional balance, and
          spiritual awareness.
          </p>
        </div>

        <div className="sanatan-card">
          <h3 className="text-xl font-semibold mb-3 text-yoga-burnt">
          Yog Philosophy
          </h3>
          <p className="text-muted-foreground">
          Making the ancient wisdom of yogic texts relevant and applicable
          to modern life challenges.
          </p>
        </div>
        </div>
      </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yoga-cream py-16 rounded-2xl">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-yoga-burnt">
        Learn from Yog Sadhak Umesh
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
        Experience the authentic teachings of yog under the guidance of an
        experienced practitioner with decades of knowledge and practice.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href={googleFormBookLink || ""} target="_blank">
          <Button
          size="lg"
          className="bg-yoga-burnt hover:bg-yoga-lightorange w-full"
          >
          Book a Session
          </Button>
        </Link>
        <Link href={googleFormContactLink || ""} target="_blank">
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
  );
}
