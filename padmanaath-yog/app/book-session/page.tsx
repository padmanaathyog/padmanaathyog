import type { Metadata } from "next"
import SectionHeader from "@/components/section-header"

export const metadata: Metadata = {
  title: "Book a Session | Padmanaath Yog",
  description: "Book a yoga session with Padmanaath Yog. Fill out our form to schedule your next yoga class.",
}

export default function BookSessionPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader title="Book a Session" subtitle="Fill out the form below to schedule your next yoga session" />

        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="aspect-[4/3] w-full">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdFxcD7Htf5-mfiBDMcbP7D_nUNpZ1ZHW8NHGaRIcYQYCo-Dw/viewform?embedded=true"
              width="100%"
              height="100%"
              className="w-full h-full min-h-[800px]"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading Google Form...
            </iframe>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
            <p className="text-gray-600 mb-4">
              After submitting the form, our team will contact you within 24 hours to confirm your booking and provide
              any additional information you may need.
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Please Note:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Arrive 10 minutes before your scheduled session</li>
                <li>Wear comfortable clothing suitable for yoga practice</li>
                <li>Bring your own yoga mat if you have one (we have extras if needed)</li>
                <li>Let us know of any injuries or health concerns in advance</li>
                <li>Cancellations should be made at least 24 hours in advance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
