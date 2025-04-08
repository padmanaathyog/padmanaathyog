import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="mb-3 text-3xl md:text-4xl font-bold tracking-tight text-yoga-burnt relative inline-block">
        {title}
        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yoga-burnt/30 rounded"></span>
      </h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">{subtitle}</p>}
    </div>
  )
}

