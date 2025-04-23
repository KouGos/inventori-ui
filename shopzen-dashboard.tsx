"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  Bell,
  ChevronDown,
  Home,
  Package,
  Box,
  Users,
  FileText,
  DollarSign,
  BarChart2,
  MessageSquare,
  Tag,
  ShoppingBag,
  CreditCard,
  Grid,
  Plus,
  Settings,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ShopZenDashboard() {
  const [activeTab, setActiveTab] = useState("all")

  const purchaseOrders = [
    {
      id: "PO1",
      code: "R001",
      supplier: "Supplier1",
      destination: "Warehouse1",
      status: "closed",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Jan 20, 2024",
    },
    {
      id: "PO2",
      code: "R002",
      supplier: "Supplier2",
      destination: "Warehouse2",
      status: "open",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Jan 24, 2024",
    },
    {
      id: "PO3",
      code: "R003",
      supplier: "Supplier3",
      destination: "Warehouse3",
      status: "closed",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Jan 26, 2024",
    },
    {
      id: "PO4",
      code: "R004",
      supplier: "Supplier4",
      destination: "Warehouse4",
      status: "open",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Jan 28, 2024",
    },
    {
      id: "PO5",
      code: "R005",
      supplier: "Supplier5",
      destination: "Warehouse5",
      status: "closed",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Feb 10, 2024",
    },
    {
      id: "PO6",
      code: "R006",
      supplier: "Supplier6",
      destination: "Warehouse6",
      status: "open",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Feb 12, 2024",
    },
    {
      id: "PO7",
      code: "R007",
      supplier: "Supplier7",
      destination: "Warehouse7",
      status: "closed",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Feb 14, 2024",
    },
    {
      id: "PO8",
      code: "R008",
      supplier: "Supplier8",
      destination: "Warehouse8",
      status: "open",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Feb 16, 2024",
    },
    {
      id: "PO9",
      code: "R009",
      supplier: "Supplier9",
      destination: "Warehouse9",
      status: "closed",
      quantity: "3 of 3",
      total: "$0.00",
      arrival: "Feb 18, 2024",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center gap-2 border-b">
          <Image src="/logo.svg" alt="Medical Inventory Logo" width={120} height={32} className="h-8 w-auto" />
          <ChevronLeft className="ml-auto w-5 h-5 text-gray-400" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            <NavItem icon={<Home className="w-5 h-5" />} label="Home" />
            <NavItem icon={<Package className="w-5 h-5" />} label="Orders" hasDropdown />

            <NavItem icon={<Box className="w-5 h-5" />} label="Products" hasDropdown active />
            <div className="pl-9 space-y-1 text-sm">
              <SubNavItem label="Collection" />
              <SubNavItem label="Inventory" />
              <SubNavItem label="Purchase orders" active />
              <SubNavItem label="Transfers" />
              <SubNavItem label="Gift cards" />
            </div>

            <NavItem icon={<Users className="w-5 h-5" />} label="Customers" hasDropdown />
            <NavItem icon={<FileText className="w-5 h-5" />} label="Content" hasDropdown />
            <NavItem icon={<DollarSign className="w-5 h-5" />} label="Finances" hasDropdown />
            <NavItem icon={<BarChart2 className="w-5 h-5" />} label="Analytics" hasDropdown />
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Marketing" hasDropdown />
            <NavItem icon={<Tag className="w-5 h-5" />} label="Discounts" badge="New" />

            <div className="pt-2 pb-1">
              <p className="text-xs font-medium text-gray-500 px-3 pb-2">Sales Channels</p>
            </div>
            <NavItem icon={<Grid className="w-5 h-5" />} label="Online Store" hasDropdown />
            <NavItem icon={<CreditCard className="w-5 h-5" />} label="Point of Sale" hasDropdown />
            <NavItem icon={<ShoppingBag className="w-5 h-5" />} label="Shop" hasDropdown />

            <div className="pt-2 pb-1">
              <p className="text-xs font-medium text-gray-500 px-3 pb-2">Apps</p>
            </div>
            <NavItem icon={<Plus className="w-5 h-5" />} label="Add Apps" hasDropdown />
          </div>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t">
          <NavItem icon={<Settings className="w-5 h-5" />} label="Setting" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-14 flex items-center px-4 justify-between">
          <div className="w-80">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search or type command..." className="pl-9 h-9 w-full bg-gray-50 border-gray-200" />
              <div className="absolute right-2.5 top-2 text-xs text-gray-400 border px-1 rounded">⌘/</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-500" />
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-brand-100 text-brand-600">U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-semibold">Purchase orders</h1>
                <p className="text-sm text-gray-500 mt-1">
                  The inventory section on the ShopZen product page provides a snapshot of product availability.
                </p>
              </div>
              {/* Purchase order actions will be available on the purchase orders page */}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-md shadow-sm mb-6">
              <div className="flex justify-between items-center p-2 border-b">
                <Tabs defaultValue="all" className="w-auto">
                  <TabsList className="bg-transparent h-9 p-0">
                    <TabsTrigger
                      value="all"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="draft"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      Draft
                    </TabsTrigger>
                    <TabsTrigger
                      value="ordered"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      Ordered
                    </TabsTrigger>
                    <TabsTrigger
                      value="partial"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      Partial
                    </TabsTrigger>
                    <TabsTrigger
                      value="received"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      Received
                    </TabsTrigger>
                    <TabsTrigger
                      value="closed"
                      className="rounded-md data-[state=active]:bg-transparent data-[state=active]:shadow-none px-3 h-9"
                    >
                      Closed
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-sm text-gray-500">
                      <th className="w-10 px-4 py-3 text-left font-normal">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-4 py-3 text-left font-normal">Purchase order</th>
                      <th className="px-4 py-3 text-left font-normal">Supplier</th>
                      <th className="px-4 py-3 text-left font-normal">Destination</th>
                      <th className="px-4 py-3 text-left font-normal">Status</th>
                      <th className="px-4 py-3 text-left font-normal">Received</th>
                      <th className="px-4 py-3 text-left font-normal">Total</th>
                      <th className="px-4 py-3 text-left font-normal">Expected arrival</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium">#{order.id}</div>
                          <div className="text-xs text-gray-500">{order.code}</div>
                        </td>
                        <td className="px-4 py-3">{order.supplier}</td>
                        <td className="px-4 py-3">{order.destination}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                              order.status === "open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            <span
                              className={`mr-1 h-1.5 w-1.5 rounded-full ${
                                order.status === "open" ? "bg-green-400" : "bg-red-400"
                              }`}
                            ></span>
                            {order.status === "open" ? "Open" : "Closed"}
                          </span>
                        </td>
                        <td className="px-4 py-3">{order.quantity}</td>
                        <td className="px-4 py-3">{order.total}</td>
                        <td className="px-4 py-3">{order.arrival}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="text-right text-sm">
              <span>Learn more about </span>
              <a href="#" className="text-brand-600 hover:underline">
                Purchase orders
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ icon, label, hasDropdown, active, badge }) {
  return (
    <div
      className={`flex items-center px-3 py-2 text-sm rounded-md ${
        active ? "bg-brand-50 text-brand-600" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
      {hasDropdown && <ChevronDown className="ml-auto w-4 h-4" />}
      {badge && <span className="ml-auto text-xs bg-brand-100 text-brand-600 px-1.5 py-0.5 rounded">{badge}</span>}
    </div>
  )
}

function SubNavItem({ label, active }) {
  return <div className={`py-1 ${active ? "text-brand-600 font-medium" : "text-gray-600"}`}>{label}</div>
}
