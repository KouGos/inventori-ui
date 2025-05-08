"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useSidebar } from "@/contexts/sidebar-context"
import { useModal } from "@/components/modal-provider"

// Material UI Icons
import SearchIcon from "@mui/icons-material/Search"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import SettingsIcon from "@mui/icons-material/Settings"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ChatIcon from "@mui/icons-material/Chat"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()
  const { openModal } = useModal()

  return (
    <header className="bg-[#f6f6f6] border-b">
      <div className="flex items-center h-16 px-4 justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-gray-500 hover:text-black"
            aria-label="Toggle sidebar"
          >
            <MenuIcon fontSize="small" />
          </Button>
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-2.5 top-2.5 text-gray-400" sx={{ fontSize: 18 }} />
            <Input placeholder="Search medical research..." className="pl-9 h-9 w-64 bg-gray-50 border-gray-200" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-black">
            <NotificationsNoneIcon fontSize="small" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8 text-gray-500 hover:text-black"
          >
            {theme === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-black">
            <HelpOutlineIcon fontSize="small" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-black">
            <SettingsIcon fontSize="small" />
          </Button>
          <Button className="bg-[#500001] hover:bg-[#700001] text-white" onClick={() => openModal("new-chat")}>
            <ChatIcon fontSize="small" className="mr-1" /> New Chat
          </Button>
        </div>
      </div>
    </header>
  )
}
