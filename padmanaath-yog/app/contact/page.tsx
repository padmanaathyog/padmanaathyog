"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SectionHeader from "@/components/section-header"
import AnimatedSection from "@/components/animated-section"
import { faqItems } from "@/lib/data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, CheckCircle, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="page-padding">
      <div className="container">
        <AnimatedSection>
          <SectionHeader
            title="Contact Us"
            subtitle="Have questions or ready to begin your yoga journey? We're here to help."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-16">
          {/* Contact Form */}
          <AnimatedSection direction="left">
            <div className="sanatan-card">
              {isSubmitted ? (
                <div className="text-center py-8 px-4">
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Thank you for reaching out!</h3>
                  <p className="text-muted-foreground mb-6">
                    We've received your message and will respond within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-yoga-burnt hover:bg-yoga-lightorange">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                      required
                      disabled={isLoading}
                    >
                      <option value="">Select a subject</option>
                      <option value="class-inquiry">Class Inquiry</option>
                      <option value="private-session">Private Session</option>
                      <option value="pricing">Pricing Information</option>
                      <option value="event">Event Information</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                      placeholder="How can we help you?"
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-yoga-burnt hover:bg-yoga-lightorange" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <AnimatedSection direction="right" className="flex flex-col space-y-6 md:space-y-8">
            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-4 text-yoga-burnt">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="text-yoga-burnt mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Main Therapy Center</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Jamsut, Between Chiplun and Guhaghar, Kokan, Maharashtra
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <MapPin className="text-yoga-burnt mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Consultation Center</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">Pune, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Phone className="text-yoga-burnt mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Mail className="text-yoga-burnt mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">padmanaathyog@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sanatan-card">
              <h3 className="text-xl font-semibold mb-4 text-yoga-burnt">Session Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-sm sm:text-base">Monday - Friday</span>
                  <span className="text-muted-foreground text-sm sm:text-base">6:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm sm:text-base">Saturday</span>
                  <span className="text-muted-foreground text-sm sm:text-base">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-sm sm:text-base">Sunday</span>
                  <span className="text-muted-foreground text-sm sm:text-base">9:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            <div className="relative h-48 sm:h-72 rounded-2xl overflow-hidden">
              {/* This would be a Google Map in a real implementation */}
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Padmanaath Yog Location Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-yoga-burnt hover:bg-yoga-lightorange z-10">View on Google Maps</Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ Preview */}
        <AnimatedSection direction="up" className="mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-yoga-burnt">Common Questions</h2>

          <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
            {faqItems.slice(0, 3).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="sanatan-card">
                <AccordionTrigger className="px-4 sm:px-6 text-left font-medium text-yoga-burnt text-sm sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 sm:px-6 pb-4 text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Button asChild className="bg-yoga-burnt hover:bg-yoga-lightorange">
              <Link href="/faq">View All FAQs</Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* Connect With Us */}
        <AnimatedSection direction="up" className="bg-yoga-burnt/10 rounded-2xl p-4 sm:p-8 mb-12 md:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-yoga-burnt">Connect With Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Follow us on social media to stay updated on our latest events, workshops, and yoga tips.
            </p>
          </div>

          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="#"
              className="bg-white p-3 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-yoga-burnt" />
            </a>
            <a
              href="#"
              className="bg-white p-3 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-yoga-burnt" />
            </a>
            <a
              href="#"
              className="bg-white p-3 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-yoga-burnt" />
            </a>
            <a
              href="#"
              className="bg-white p-3 sm:p-4 rounded-full shadow-md hover:shadow-lg transition-shadow"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 sm:h-6 sm:w-6 text-yoga-burnt" />
            </a>
          </div>
        </AnimatedSection>

        {/* Newsletter Signup */}
        <AnimatedSection direction="up" className="bg-yoga-cream rounded-2xl p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4 text-yoga-burnt">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Stay updated with our latest events, workshops, and yoga tips delivered straight to your inbox.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yoga-burnt"
                required
              />
              <Button type="submit" className="bg-yoga-burnt hover:bg-yoga-lightorange whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
