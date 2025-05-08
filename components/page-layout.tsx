import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn("flex-1 overflow-auto bg-[#e8e8e8]", className)}>
      <div className="container mx-auto py-6 px-4 h-full">{children}</div>
    </main>
  )
}
