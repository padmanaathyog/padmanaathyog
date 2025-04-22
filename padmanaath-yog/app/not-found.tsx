import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center glassmorphic p-8 rounded-2xl">
        <h1 className="text-6xl font-bold text-yoga-leaf mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-yoga-sage hover:bg-yoga-leaf">
            <Link href="/">Return Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-yoga-sage text-yoga-sage hover:bg-yoga-sage hover:text-white"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
