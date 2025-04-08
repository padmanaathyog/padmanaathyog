import { faqItems } from "@/lib/data"
import SectionHeader from "@/components/section-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Padmanaath Yog, therapeutic yoga, and our approach to wellness.",
}

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

