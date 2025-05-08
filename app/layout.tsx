import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { Sidebar } from "@/components/sidebar"
import { ModalProvider } from "@/components/modal-provider"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Medical Research Assistant",
  description: "AI-powered medical research assistant",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <ModalProvider>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <Header />
                  {children}
                </div>
              </div>
            </ModalProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
