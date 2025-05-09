"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { usePathname } from "next/navigation"

// Define navigation structure with dropdowns
const navLinks = [
  { href: "/home", label: "Home" },
  {
    label: "About Us",
    dropdown: true,
    items: [
      { href: "/blog", label: "Blog" },
      { href: "/events", label: "Events" },
      { href: "/padmanaath-yog", label: "Padmanaath Yog" },
      { href: "/yoga-protocol", label: "Yoga-Protocol" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  {
    label: "Yog",
    dropdown: true,
    items: [
      { href: "/therapeutic-yog", label: "Therapeutic Yog" },
    ],
  },
  { href: "/the-learned", label: "The Learned" },
  {
    href: process.env.NEXT_PUBLIC_CONTACT_FORM_URL || "#",
    label: "Contact",
    external: !!process.env.NEXT_PUBLIC_CONTACT_FORM_URL,
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const googleFormBookLink = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const currentRef = dropdownRefs.current[activeDropdown]
        if (currentRef && !currentRef.contains(event.target as Node)) {
          setActiveDropdown(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

  // Close dropdown and menu when navigating
  useEffect(() => {
    setActiveDropdown(null)
    setIsMenuOpen(false)
  }, [pathname])

  // Toggle dropdown open/closed
  const toggleDropdown = (e: React.MouseEvent, label: string) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  function renderNavLink(link: { 
    href: string; 
    label: string; 
    dropdown?: undefined; 
    items?: undefined; 
    external?: boolean 
  }): React.ReactNode {
    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className={cn(
            "px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-yoga-burnt transition-colors rounded-md",
            pathname === link.href && "text-yoga-burnt"
          )}
        >
          {link.label}
        </a>
      )
    }

    return (
      <Link
        href={link.href}
        onClick={closeMenu}
        className={cn(
          "px-3 py-2 text-sm lg:text-base text-gray-700 hover:text-yoga-burnt transition-colors rounded-md",
          pathname === link.href && "text-yoga-burnt"
        )}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src="/logo-detailed.svg"
            alt="Padmanaath Yog Logo"
            width={180}
            height={45}
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              ref={(el) => {
                if (link.dropdown) {
                  dropdownRefs.current[link.label] = el
                }
              }}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={(e) => toggleDropdown(e, link.label)}
                    className={cn(
                      "px-3 py-2 text-sm lg:text-base flex items-center gap-1 text-gray-700 hover:text-yoga-burnt transition-colors rounded-md",
                      activeDropdown === link.label && "text-yoga-burnt",
                    )}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", activeDropdown === link.label && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      >
                        {link.items?.map((item: any) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yoga-burnt",
                              pathname === item.href && "bg-gray-100 text-yoga-burnt",
                            )}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                link.href ? renderNavLink(link) : null
              )}
            </div>
          ))}
          <Button asChild className="ml-2 bg-yoga-burnt hover:bg-yoga-lightorange">
            <a
              href={googleFormBookLink} 
              target="_blank" 
              rel="noopener noreferrer" 
            >
              Book a Session
            </a>
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={(e) => toggleDropdown(e, link.label)}
                        className="px-3 py-2 text-sm text-gray-700 hover:text-yoga-burnt transition-colors rounded-md flex justify-between items-center"
                        aria-expanded={activeDropdown === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn("transition-transform", activeDropdown === link.label && "rotate-180")}
                        />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-1 flex flex-col space-y-1 border-l-2 border-gray-200 pl-4"
                          >
                            {link.items?.map((item: any) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "px-3 py-2 text-sm text-gray-700 hover:text-yoga-burnt transition-colors rounded-md",
                                  pathname === item.href && "text-yoga-burnt font-medium",
                                )}
                                onClick={closeMenu}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <div className="flex items-center">
                      {link.href && renderNavLink(link as { href: string; label: string; external?: boolean })}
                    </div>
                  )}
                </div>
              ))}
              <Button
                asChild
                className="mt-2 bg-yoga-burnt hover:bg-yoga-lightorange w-full"
                onClick={closeMenu}
              >
                <a
                  href={googleFormBookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-white text-sm"
                >
                  Book a Session
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}