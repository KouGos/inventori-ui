"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  TestTube,
  BarChart2,
  Store,
  DollarSign,
  FileText,
  Building2,
  Settings,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/contexts/sidebar-context"

type NavItem = {
  icon: React.ReactNode
  label: string
  href: string
  children?: { label: string; href: string; children?: { label: string; href: string }[] }[]
}

const navItems: NavItem[] = [
  {
    icon: <Home className="w-5 h-5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Package className="w-5 h-5" />,
    label: "Orders",
    href: "/orders",
    children: [
      { label: "Purchase orders", href: "/orders/purchase-orders" },
      { label: "Transfers", href: "/orders/transfers" },
      { label: "Return orders", href: "/orders/return-orders" },
    ],
  },
  {
    icon: <TestTube className="w-5 h-5" />,
    label: "Products",
    href: "/products",
    children: [
      { label: "Collection", href: "/products/collection" },
      { label: "Inventory", href: "/products/inventory" },
      { label: "Expiry tracker", href: "/products/expiry-tracker" },
      {
        label: "Categories",
        href: "/products/categories",
        children: [
          { label: "Consumables", href: "/products/categories/consumables" },
          { label: "Equipment", href: "/products/categories/equipment" },
          { label: "Instruments", href: "/products/categories/instruments" },
          { label: "Reagents", href: "/products/categories/reagents" },
        ],
      },
      { label: "Stock alerts", href: "/products/stock-alerts" },
      { label: "Barcode / QR labels", href: "/products/labels" },
    ],
  },
  {
    icon: <BarChart2 className="w-5 h-5" />,
    label: "Analytics",
    href: "/analytics",
    children: [
      { label: "Stock usage", href: "/analytics/stock-usage" },
      { label: "Expiry forecasts", href: "/analytics/expiry-forecasts" },
      { label: "Order frequency", href: "/analytics/order-frequency" },
      { label: "Cost vs usage", href: "/analytics/cost-vs-usage" },
    ],
  },
  {
    icon: <Store className="w-5 h-5" />,
    label: "Suppliers",
    href: "/suppliers",
    children: [
      { label: "All suppliers", href: "/suppliers/all" },
      { label: "Add supplier", href: "/suppliers/add" },
      { label: "Ratings", href: "/suppliers/ratings" },
      { label: "Contracts", href: "/suppliers/contracts" },
    ],
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    label: "Finances",
    href: "/finances",
    children: [
      { label: "Expenses", href: "/finances/expenses" },
      { label: "Invoices", href: "/finances/invoices" },
      { label: "Purchase history", href: "/finances/purchase-history" },
      { label: "Payments", href: "/finances/payments" },
    ],
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Content",
    href: "/content",
    children: [
      { label: "SOPs", href: "/content/sops" },
      { label: "Datasheets", href: "/content/datasheets" },
      { label: "Uploads", href: "/content/uploads" },
    ],
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    label: "Locations",
    href: "/locations",
    children: [
      { label: "Warehouses", href: "/locations/warehouses" },
      { label: "Add location", href: "/locations/add" },
      { label: "Temperature logs", href: "/locations/temperature-logs" },
    ],
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings",
    children: [
      { label: "Roles & permissions", href: "/settings/roles" },
      { label: "API / Integrations", href: "/settings/api" },
      { label: "Backup & sync", href: "/settings/backup" },
      { label: "Notifications", href: "/settings/notifications" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const { collapsed } = useSidebar()

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
        "bg-[#f6f6f6] border-r flex flex-col dark:bg-gray-900 dark:border-gray-800 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "p-4 flex items-center gap-2 border-b dark:border-gray-800 transition-all duration-300",
          collapsed ? "justify-center" : "",
        )}
      >
        <Link href="/">
          {collapsed ? (
            <Image src="/logo-icon.svg" alt="Inventori Logo" width={32} height={32} className="h-8 w-auto" />
          ) : (
            <Image src="/logo.svg" alt="Inventori Logo" width={120} height={32} className="h-8 w-auto" />
          )}
        </Link>
        {!collapsed && <ChevronLeft className="ml-auto w-5 h-5 text-gray-400" />}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
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
                      active || childActive
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700",
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn("ml-auto w-4 h-4 transition-transform", isOpen ? "transform rotate-180" : "")}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm rounded-md",
                      collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                      active
                        ? "bg-brand-50 text-brand-600"
                        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700",
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
                                  childActive || subChildActive
                                    ? "text-brand-600 font-medium dark:text-white"
                                    : "text-gray-600 dark:text-gray-400",
                                )}
                              >
                                <span>{child.label}</span>
                                <ChevronRight
                                  className={cn(
                                    "ml-auto w-4 h-4 transition-transform",
                                    isSubOpen ? "transform rotate-90" : "",
                                  )}
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
                                        isActive(subChild.href)
                                          ? "text-brand-600 font-medium dark:text-white"
                                          : "text-gray-600 dark:text-gray-400",
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
                                childActive
                                  ? "text-brand-600 font-medium dark:text-white"
                                  : "text-gray-600 dark:text-gray-400",
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

      {/* User */}
      <div className={cn("p-4 border-t flex items-center dark:border-gray-800", collapsed ? "justify-center" : "")}>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback className="bg-brand-100 text-brand-600">JD</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <div className="ml-2 text-sm">
              <div className="font-medium dark:text-white">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
