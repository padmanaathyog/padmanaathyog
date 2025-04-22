import SectionHeader from "@/components/section-header"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer and terms of use for Padmanaath Yog website and services.",
}

export default function DisclaimerPage() {
  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Disclaimer"
          subtitle="Please read this disclaimer carefully before using our website and services."
        />

        <div className="max-w-3xl mx-auto sanatan-card mb-8">
          <div className="space-y-6 p-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">Copyright Notice</h2>
              <p className="text-muted-foreground">
                All content on this website, including text, images, videos, graphics, logos, and other material, is the
                property of Padmanaath Yog and is protected by copyright laws. This material is for information purposes
                only. We hold no responsibility for any misuse. Unauthorized reproduction, distribution, or use of any
                content from this website is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">Health Disclaimer</h2>
              <p className="text-muted-foreground">
                The information provided on this website is for general informational purposes only and is not intended
                as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
                physician or other qualified health provider with any questions you may have regarding a medical
                condition.
              </p>
              <p className="text-muted-foreground mt-2">
                Yoga practice involves physical movement and should be done with caution. If you experience any pain or
                discomfort, stop immediately and consult a healthcare professional. Pregnant women, people with
                injuries, or those with medical conditions should consult with a healthcare professional before
                beginning any yoga practice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">No Guarantees</h2>
              <p className="text-muted-foreground">
                While we strive to provide accurate and up-to-date information, Padmanaath Yog makes no representations
                or warranties of any kind, express or implied, about the completeness, accuracy, reliability,
                suitability, or availability of the information, products, services, or related graphics contained on
                the website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">External Links</h2>
              <p className="text-muted-foreground">
                This website may contain links to external websites that are not provided or maintained by Padmanaath
                Yog. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on
                these external websites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">Changes to Disclaimer</h2>
              <p className="text-muted-foreground">
                Padmanaath Yog reserves the right to modify this disclaimer at any time. Changes will be effective
                immediately upon posting to the website. Your continued use of the website after any changes indicates
                your acceptance of the modified disclaimer.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-yoga-burnt">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about this disclaimer, please contact us at
                padmanaathyog@gmail.com.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-yoga-burnt hover:bg-yoga-lightorange">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
