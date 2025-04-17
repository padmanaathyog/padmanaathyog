import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label = "Back" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-yoga-burnt hover:text-yoga-lightorange transition-colors mb-6"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </Link>
  )
}
