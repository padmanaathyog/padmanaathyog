import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  slug: string
  className?: string
}

export default function BlogCard({ title, excerpt, image, author, date, slug, className }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className={cn("group block", className)}>
      <div className="sanatan-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=400&width=600"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-yoga-burnt group-hover:text-yoga-lightorange transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{excerpt}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
            <span>{author}</span>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-yoga-burnt" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
