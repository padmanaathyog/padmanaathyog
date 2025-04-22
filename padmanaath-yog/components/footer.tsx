import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-yoga-burnt/10 border-t border-yoga-burnt/20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-sans font-bold tracking-tight text-yoga-burnt">
              Padmanaath<span className="text-yoga-brown">Yog</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Join us on a journey to balance mind, body, and spirit through the ancient Sanatan practice of yoga in a
              serene, natural environment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                Home
              </Link>
              <Link href="/the-learned" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                The Learned
              </Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                Contact
              </Link>
              <Link href="/events" className="text-muted-foreground hover:text-yoga-burnt transition-colors">
                Events
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-yoga-burnt mt-0.5" />
                <span className="text-muted-foreground">Jamsut, Between Chiplun and Guhaghar, Kokan, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-yoga-burnt" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-yoga-burnt" />
                <span className="text-muted-foreground">padmanaathyog@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Studio Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Session Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-muted-foreground">6:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-muted-foreground">9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-yoga-burnt/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Padmanaath Yog. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-yoga-burnt transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-yoga-burnt transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-yoga-burnt transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
