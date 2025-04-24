import SectionHeader from "@/components/section-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Padmanaath Yog, therapeutic yoga, and our approach to wellness.",
}

// Hardcoded FAQ items
const faqItems = [
  {
    question: "What is therapeutic yoga?",
    answer:
      "Therapeutic yoga is a practice designed to support physical, mental, and emotional healing. It uses gentle, tailored yoga techniques to address specific health issues, reduce pain, and promote overall well-being.",
  },
  {
    question: "What is the definition of health according to Ayurveda?",
    answer:
      "According to Charaka Samhita, 'Samadosha samagnischa samadhatu malakriyah, Prasannatma indriya manah swastha iti abhidhiyate' - A person who has balanced doshas (bodily humors), balanced agni (digestive fire), balanced dhatus (bodily tissues), and proper excretion of waste products, whose mind, senses, and intellect are calm is said to be in a state of perfect health.",
  },
  {
    question: "Do I need prior yoga experience to join a class?",
    answer:
      "No, therapeutic yoga is suitable for all levels, including beginners. Each class is designed to be accessible and tailored to your needs, whether you're new to yoga or have prior experience.",
  },
  {
    question: "Why choose Padmanaath Yog?",
    answer:
      "Learning yoga from the learned in the beautiful surroundings of Kokan brings out the best in every human being. Nature and cosmic energies assist in regaining, rejuvenation, and rehabilitation. Our approach combines authentic traditional practices with modern understanding to address contemporary health challenges.",
  },
  {
    question: "Who can benefit from Padmanaath Yog?",
    answer:
      "Yoga is helpful and essential for everyone of all ages. Youngsters, students, adolescents, would-be to-wed couples, married couples, pregnant women, sports persons, employers, employees, entrepreneurs, retired persons, post-operative cardiac patients, those needing rehabilitation, and people with psychological or metabolic disorders can all benefit from our tailored yoga protocols.",
  },
  {
    question: "Where is Padmanaath Yog Kendra located?",
    answer:
      "Our main therapy center is nestled in the scenic beauty of Kokan (Maharashtra), in a place called Jamsut, between Chiplun and Guhaghar. It's just about 5-10 km from the beautiful beaches of Hedavi, Velneshwar, and Bamanghal. The area offers plenty of clean air, sunlight, and water. We also have a consultation and contact center in Pune.",
  },
  {
    question: "Are the yoga protocols customized?",
    answer:
      "Yes, our protocols are customized to each person's needs, abilities, targets, and inclinations. We believe in personalized practice that addresses individual health requirements rather than a one-size-fits-all approach.",
  },
  {
    question: "What should I bring to a class?",
    answer:
      "We recommend bringing a yoga mat, comfortable clothing, and a water bottle. If you're attending an online class, make sure you have enough space to move comfortably.",
  },
  {
    question: "How do I book a session or class?",
    answer:
      "You can easily book a session or class by contacting us directly via email at padmanaathyog@gmail.com or by phone. We'll help you find the right class or program for your needs.",
  },
  {
    question: "What other activities are available around Padmanaath Yog Kendra?",
    answer:
      "The area offers spiritual excursions to heritage temples like Lote Parashuram, Hedavi Ganapati, Velneshwar, and Guhaghar. You can also enjoy field activities, bird watching, star-gazing on clear nights, and even practicing yoga during rainfall - a unique experience that city dwellers rarely get to enjoy.",
  },
]

export default function FAQPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our yoga practices, sessions, and approach to wellness."
        />

        <div className="max-w-3xl mx-auto mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="sanatan-card">
                <AccordionTrigger className="px-6 text-left font-medium text-yoga-burnt">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-yoga-burnt/10 p-8 rounded-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-yoga-burnt text-center">Still Have Questions?</h2>
          <p className="text-center mb-6 text-muted-foreground">
            If you couldn't find the answer to your question, please feel free to contact us directly. We're here to
            help!
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
