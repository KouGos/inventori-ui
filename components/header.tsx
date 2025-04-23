"use client"

import { Search, HelpCircle, Settings, Moon, Sun, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useSidebar } from "@/contexts/sidebar-context"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-[#f6f6f6] border-b dark:bg-gray-950 dark:border-gray-800">
      <div className="flex items-center h-14 px-4 justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search or type command..."
              className="pl-9 h-9 w-full bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800"
            />
            <div className="absolute right-2.5 top-2 text-xs text-gray-400 border px-1 rounded dark:border-gray-700">
              ⌘/
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Quick Actions
          </Button>
        </div>
      </div>
    </header>
  )
}
