"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {isSubmitted ? (
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Thank you for subscribing!</h3>
          <p className="text-muted-foreground">You'll start receiving our newsletters and updates soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" className="bg-yoga-orange hover:bg-yoga-ochre" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      )}
    </div>
  )
}

