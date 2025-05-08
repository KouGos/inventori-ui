"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/contexts/sidebar-context"
import { useModal } from "@/components/modal-provider"

// Material UI Icons
import ChatIcon from "@mui/icons-material/Chat"
import AddIcon from "@mui/icons-material/Add"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PsychologyIcon from "@mui/icons-material/Psychology"
import DataObjectIcon from "@mui/icons-material/DataObject"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import SettingsIcon from "@mui/icons-material/Settings"
import NotificationsIcon from "@mui/icons-material/Notifications"
import HistoryIcon from "@mui/icons-material/History"
import BiotechIcon from "@mui/icons-material/Biotech"

type NavItem = {
  icon: React.ReactNode
  label: string
  href: string
  children?: { label: string; href: string; children?: { label: string; href: string }[] }[]
}

const navItems: NavItem[] = [
  {
    icon: <ChatIcon fontSize="small" />,
    label: "Chat",
    href: "/",
  },
  {
    icon: <BiotechIcon fontSize="small" />,
    label: "Research Tools",
    href: "/tools",
    children: [
      { label: "Literature Analyzer", href: "/tools/literature" },
      { label: "Study Comparator", href: "/tools/comparator" },
      { label: "Hypothesis Generator", href: "/tools/hypothesis" },
      { label: "Protocol Designer", href: "/tools/protocol" },
    ],
  },
  {
    icon: <MenuBookIcon fontSize="small" />,
    label: "Knowledge Base",
    href: "/knowledge",
    children: [
      { label: "Medical Specialties", href: "/knowledge/specialties" },
      { label: "Clinical Guidelines", href: "/knowledge/guidelines" },
      { label: "Drug Database", href: "/knowledge/drugs" },
      { label: "Medical Journals", href: "/knowledge/journals" },
    ],
  },
  {
    icon: <PsychologyIcon fontSize="small" />,
    label: "AI Models",
    href: "/models",
    children: [
      { label: "General Medical", href: "/models/general" },
      { label: "Specialized Models", href: "/models/specialized" },
      { label: "Model Comparison", href: "/models/comparison" },
    ],
  },
  {
    icon: <DataObjectIcon fontSize="small" />,
    label: "My Library",
    href: "/library",
    children: [
      { label: "Saved Papers", href: "/library/papers" },
      { label: "Uploaded Documents", href: "/library/documents" },
      { label: "Research Notes", href: "/library/notes" },
    ],
  },
  {
    icon: <AutoAwesomeIcon fontSize="small" />,
    label: "Discover",
    href: "/discover",
    children: [
      { label: "Trending Research", href: "/discover/trending" },
      { label: "New Publications", href: "/discover/new" },
      { label: "Recommended", href: "/discover/recommended" },
    ],
  },
  {
    icon: <SettingsIcon fontSize="small" />,
    label: "Settings",
    href: "/settings",
    children: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Preferences", href: "/settings/preferences" },
      { label: "API Access", href: "/settings/api" },
      { label: "Notifications", href: "/settings/notifications" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const { collapsed } = useSidebar()
  const { openModal } = useModal()

  // Reset open items when sidebar collapses
  useEffect(() => {
    if (collapsed) {
      setOpenItems({})
    }
  }, [collapsed])

  const toggleItem = (label: string) => {
    if (!collapsed) {
      setOpenItems((prev) => ({
        ...prev,
        [label]: !prev[label],
      }))
    }
  }

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Automatically open parent items if child is active
  const isChildActive = (item: NavItem) => {
    if (!item.children) return false
    return item.children.some(
      (child) => isActive(child.href) || (child.children && child.children.some((subChild) => isActive(subChild.href))),
    )
  }

  return (
    <div
      className={cn(
        "bg-[#f6f6f6] border-r flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "p-4 flex items-center gap-2 border-b transition-all duration-300",
          collapsed ? "justify-center" : "",
        )}
      >
        <Link href="/">
          {collapsed ? (
            <Image src="/logo-icon.svg" alt="MedAssist Logo" width={32} height={32} className="h-8 w-auto" />
          ) : (
            <Image src="/logo.svg" alt="MedAssist Logo" width={120} height={32} className="h-8 w-auto" />
          )}
        </Link>
        {!collapsed && <KeyboardArrowLeftIcon className="ml-auto text-gray-400" fontSize="small" />}
      </div>

      {/* New Chat Button */}
      <div className={cn("p-3", collapsed ? "px-2" : "")}>
        <Button
          className={cn(
            "w-full bg-[#500001] hover:bg-[#700001] text-white flex items-center justify-center gap-2",
            collapsed ? "px-0" : "",
          )}
          onClick={() => openModal("new-chat")}
        >
          <AddIcon fontSize="small" />
          {!collapsed && <span>New Chat</span>}
        </Button>
      </div>

      {/* Navigation */}
      <div className="overflow-y-auto">
        <nav className="py-2">
          <div className={cn("space-y-1", collapsed ? "px-2" : "px-3")}>
            {navItems.map((item) => {
              const active = isActive(item.href)
              const hasChildren = item.children && item.children.length > 0
              const childActive = isChildActive(item)
              const isOpen = openItems[item.label] || childActive

              return (
                <div key={item.label} className="space-y-1">
                  {hasChildren && !collapsed ? (
                    <button
                      onClick={() => toggleItem(item.label)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm rounded-md",
                        active || childActive ? "bg-red-50 text-[#500001]" : "text-gray-700 hover:bg-gray-100",
                      )}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      <KeyboardArrowDownIcon
                        className={cn("ml-auto transition-transform", isOpen ? "transform rotate-180" : "")}
                        fontSize="small"
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm rounded-md",
                        collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                        active || childActive ? "bg-red-50 text-[#500001]" : "text-gray-700 hover:bg-gray-100",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className={cn(collapsed ? "mr-0" : "mr-3")}>{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )}

                  {/* First level children */}
                  {hasChildren && isOpen && !collapsed && (
                    <div className="pl-9 space-y-1 text-sm">
                      {item.children?.map((child) => {
                        const childActive = isActive(child.href)
                        const hasSubChildren = child.children && child.children.length > 0
                        const subChildActive =
                          hasSubChildren && child.children.some((subChild) => isActive(subChild.href))
                        const isSubOpen = openItems[child.label] || subChildActive

                        return (
                          <div key={child.label}>
                            {hasSubChildren ? (
                              <>
                                <button
                                  onClick={() => toggleItem(child.label)}
                                  className={cn(
                                    "flex items-center w-full py-1",
                                    childActive || subChildActive ? "text-[#500001] font-medium" : "text-gray-600",
                                  )}
                                >
                                  <span>{child.label}</span>
                                  <KeyboardArrowRightIcon
                                    className={cn(
                                      "ml-auto transition-transform",
                                      isSubOpen ? "transform rotate-90" : "",
                                    )}
                                    fontSize="small"
                                  />
                                </button>

                                {/* Second level children */}
                                {isSubOpen && (
                                  <div className="pl-4 space-y-1 mt-1">
                                    {child.children?.map((subChild) => (
                                      <Link
                                        key={subChild.label}
                                        href={subChild.href}
                                        className={cn(
                                          "block py-1",
                                          isActive(subChild.href) ? "text-[#500001] font-medium" : "text-gray-600",
                                        )}
                                      >
                                        {subChild.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={child.href}
                                className={cn(
                                  "block py-1",
                                  childActive ? "text-[#500001] font-medium" : "text-gray-600",
                                )}
                              >
                                {child.label}
                              </Link>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>

        {/* Recent Chats (when not collapsed) - Positioned directly below navigation */}
        {!collapsed && (
          <div className="p-4 border-t border-b">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-500">RECENT CHATS</h3>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <HistoryIcon fontSize="small" className="text-gray-500" />
              </Button>
            </div>
            <div className="space-y-1">
              {["Cardiovascular research review", "Oncology literature search", "Neurology diagnostic criteria"].map(
                (chat, index) => (
                  <Link
                    key={index}
                    href={`/chat/${index + 1}`}
                    className="flex items-center py-1.5 px-2 text-sm rounded-md text-gray-700 hover:bg-red-50"
                  >
                    <ChatIcon fontSize="small" className="mr-2 text-[#500001]" sx={{ fontSize: 16 }} />
                    <span className="truncate">{chat}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Spacer to push user section to bottom */}
      <div className="flex-1"></div>

      {/* User */}
      <div className={cn("p-4 border-t flex items-center", collapsed ? "justify-center" : "")}>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-red-100 text-[#500001]">JD</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="ml-2 text-sm">
              <div className="font-medium text-gray-800">Dr. Jane Smith</div>
              <div className="text-xs text-gray-500">Pro Plan</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <NotificationsIcon fontSize="small" className="text-gray-500" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
