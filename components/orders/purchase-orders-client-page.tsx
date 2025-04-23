"use client"

import { PageLayout } from "@/components/page-layout"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddPurchaseOrderButton } from "@/components/add-purchase-order-button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PurchaseOrdersTable } from "@/components/orders/purchase-orders-table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import * as React from "react"

export default function PurchaseOrdersClientPage({ purchaseOrders }: { purchaseOrders: any[] }) {
  const [search, setSearch] = React.useState("")
  const [sort, setSort] = React.useState("date-desc") // default: New to Old
  const [filterCategory, setFilterCategory] = React.useState<string>("sort")
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  const sortOptions = [
    {
      label: "Price",
      items: [
        { value: "price-asc", label: "Low to High" },
        { value: "price-desc", label: "High to Low" },
      ],
    },
    {
      label: "Date",
      items: [
        { value: "date-desc", label: "New to Old" },
        { value: "date-asc", label: "Old to New" },
      ],
    },
  ]

  return (
    <TooltipProvider>
      <PageLayout
        title="Purchase Orders"
        description="Manage your purchase orders"
        headerAction={<AddPurchaseOrderButton />}
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="flex p-0 w-auto min-w-[220px] max-w-xs rounded-lg">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col border-r min-w-[90px] bg-gray-50 rounded-l-lg">
                      <div className="font-semibold text-black text-xs px-3 py-2 border-b rounded-tl-lg">Sort by</div>
                      {sortOptions.map(group => (
                        <button
                          key={group.label}
                          className={`px-3 py-1.5 text-left text-xs font-medium border-b last:border-b-0 ${filterCategory === group.label ? "bg-white text-primary" : "text-gray-700"}`}
                          style={{minHeight: '32px'}} 
                          onClick={() => setFilterCategory(group.label)}
                        >
                          {group.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 p-2 rounded-r-lg">
                      <ul className="space-y-1">
                        {sortOptions.find(g => g.label === filterCategory)?.items.map(opt => (
                          <li key={opt.value}>
                            <button
                              className={`flex items-center w-full px-2 py-1 rounded-md hover:bg-gray-100 text-[0.81rem] ${sort === opt.value ? "font-semibold text-primary" : "text-gray-700"}`}
                              style={{ minHeight: '24px' }}
                              onClick={() => { setSort(opt.value); setPopoverOpen(false); }}
                            >
                              <span className="mr-2 w-3 h-3 flex items-center justify-center">
                                {sort === opt.value ? <span className="inline-block w-2 h-2 bg-primary rounded-full" /> : null}
                              </span>
                              {opt.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="flex gap-2">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <PurchaseOrdersTable purchaseOrders={purchaseOrders || []} search={search} sort={sort} />
          </Tabs>
        </div>
      </PageLayout>
    </TooltipProvider>
  )
}
