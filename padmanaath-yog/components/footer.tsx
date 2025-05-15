import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const googleFormContactLink = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

  return (
    <footer className="bg-yoga-burnt/10 border-t border-yoga-burnt/20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-sans font-bold tracking-tight text-yoga-burnt"
            >
              Padmanaath<span className="text-yoga-brown">Yog</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Join us on a journey to balance mind, body, and spirit through the
              ancient Sanatan practice of yog in a serene, natural environment.
            </p>
            <div className="flex items-center space-x-2 mt-4 text-sm text-muted-foreground">
              <span className="font-medium">Our Associates · Location:</span>
              <Link
                href="https://ekaant.in/"
                target="_blank"
                className="text-yoga-burnt hover:text-yoga-brown transition-colors underline underline-offset-2"
              >
                Ekaant.in
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Home
              </Link>
              <Link
                href="/the-learned"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                The Learned
              </Link>
              <Link
                href="/gallery"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Blog
              </Link>
              <Link
                href={googleFormContactLink || ""}
                target="_blank"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/events"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Events
              </Link>
              <Link
                href="/reviews"
                className="text-muted-foreground hover:text-yoga-burnt transition-colors"
              >
                Reviews
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={45} className="text-yoga-burnt mt-0.5" />
                <div className="text-muted-foreground">
                  <p>
                    <strong>Pune Address:</strong> 4th floor, Ramdhwaj
                    Commercial Complex, Bibvewadi, Pune – 411037
                  </p>
                  <p>
                    <strong>Konkan Address:</strong> Ekaant Forest Homes, Jamsut,
                    Tq: Guhaghar, Dist: Ratnagiri, Maharashtra – 415703
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-yoga-burnt" />
                <span className="text-muted-foreground">
                  padmanaathyog@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="bg-white p-2 rounded-lg shadow-md">
              <Image
                src="/padmanaath-qr-code.png"
                alt="Padmanaath Yog QR Code"
                width={150}
                height={150}
                className="rounded"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Scan to share the website or
              <br />
              contact us directly
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yoga-burnt/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Padmanaath Yog. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-muted-foreground">
            <Link
              href="/disclaimer"
              className="hover:text-yoga-burnt transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
