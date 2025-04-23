import type React from "react"
import { Header } from "@/components/header"

interface PageLayoutProps {
  title?: string
  description?: string
  headerAction?: React.ReactNode
  children: React.ReactNode
}

export function PageLayout({ title, description, headerAction, children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1 overflow-auto p-6 bg-[#e8e8e8] dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Page header moved inside main content */}
          {(title || description || headerAction) && (
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <div>
                  {title && <h1 className="text-2xl font-semibold">{title}</h1>}
                  {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
                </div>
                <div className="flex-shrink-0">{headerAction}</div>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </>
  )
}
