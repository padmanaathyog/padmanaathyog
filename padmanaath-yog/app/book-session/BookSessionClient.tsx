"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import { Clock, CheckCircle } from "lucide-react"
import { yogaClasses } from "@/lib/data"
import Image from "next/image"

export default function BookSessionClient() {
  const [selectedClass, setSelectedClass] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const availableDates = ["2023-07-25", "2023-07-26", "2023-07-27", "2023-07-28", "2023-07-29"]

  const availableTimes = ["06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM", "04:00 PM", "06:00 PM"]

  return (
    <div className="page-padding">
      <div className="container">
        <SectionHeader
          title="Book a Session"
          subtitle="Schedule your yoga session with us and begin your journey to wellness."
        />

        {isSubmitted ? (
          <div className="max-w-2xl mx-auto sanatan-card p-8 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-yoga-burnt">Booking Confirmed!</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Thank you for booking a session with Padmanaath Yog. We've sent a confirmation email to {email} with all
              the details.
            </p>
            <p className="mb-8 text-muted-foreground">
              If you have any questions or need to make changes to your booking, please contact us at
              padmanaathyog@gmail.com.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-yoga-burnt hover:bg-yoga-lightorange">
              Book Another Session
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-yoga-burnt">Select a Class</h2>
              <div className="space-y-3">
                {yogaClasses.map((yogaClass) => (
                  <div
                    key={yogaClass.id}
                    className={`sanatan-card p-3 sm:p-4 cursor-pointer transition-all ${
                      selectedClass === yogaClass.id ? "border-2 border-yoga-burnt" : "hover:border-yoga-burnt/50"
                    }`}
                    onClick={() => setSelectedClass(yogaClass.id)}
                  >
                    <div className="flex items-start">
                      <div className="relative h-12 w-12 sm:h-16 sm:w-16 rounded overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
                        <Image
                          src={yogaClass.image || "/placeholder.svg"}
                          alt={yogaClass.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-yoga-burnt text-sm sm:text-base truncate">{yogaClass.title}</h3>
                        <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-1 flex-wrap">
                          <Clock size={14} className="mr-1" />
                          <span>{yogaClass.duration}</span>
                          <span className="mx-2">•</span>
                          <span>{yogaClass.level}</span>
                        </div>
                        <p className="text-xs sm:text-sm mt-1">{yogaClass.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="sanatan-card p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-yoga-burnt">Select Date & Time</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                        disabled={!selectedClass}
                      >
                        <option value="">Select a date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                        disabled={!selectedDate}
                      >
                        <option value="">Select a time</option>
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-yoga-burnt">Your Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-yoga-burnt hover:bg-yoga-lightorange transition-colors"
                    disabled={!selectedClass || !selectedDate || !selectedTime || isLoading}
                  >
                    {isLoading ? "Processing..." : "Book Session"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-12 sm:mt-16 bg-yoga-cream p-4 sm:p-8 rounded-2xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yoga-burnt text-center">Booking Information</h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            <div className="sanatan-card">
              <h3 className="text-lg font-semibold mb-3 text-yoga-burnt">Cancellation Policy</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Cancellations made 24 hours or more before the scheduled session will receive a full refund.
                Cancellations made less than 24 hours in advance are non-refundable but can be rescheduled within the
                same week, subject to availability.
              </p>
            </div>
            <div className="sanatan-card">
              <h3 className="text-lg font-semibold mb-3 text-yoga-burnt">What to Bring</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Please bring comfortable clothing, a water bottle, and a small towel. Yoga mats and props are provided,
                but you're welcome to bring your own if you prefer. Arrive 10-15 minutes before your scheduled session.
              </p>
            </div>
            <div className="sanatan-card">
              <h3 className="text-lg font-semibold mb-3 text-yoga-burnt">Private Sessions</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                For private or specialized sessions, please contact us directly at padmanaathyog@gmail.com or call us.
                We offer personalized programs tailored to your specific health needs and goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
