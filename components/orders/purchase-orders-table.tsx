"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ResizableTable } from "@/components/ui/resizable-table"

interface PurchaseOrdersTableProps {
  purchaseOrders: any[]
}

export function PurchaseOrdersTable({ purchaseOrders, search = "", sort = "date-desc", statusFilter = null }: PurchaseOrdersTableProps & { search?: string, sort?: string, statusFilter?: string | null }) {
  const columns = [
    { key: "id", label: "Order ID", minWidth: 80, defaultWidth: 100 },
    { key: "supplier", label: "Supplier", minWidth: 120, defaultWidth: 200, render: (row: any) => row.suppliers?.name || "Unknown" },
    { key: "order_date", label: "Date", minWidth: 100, defaultWidth: 140, render: (row: any) => new Date(row.order_date).toLocaleDateString() },
    { key: "total_amount", label: "Total", minWidth: 100, defaultWidth: 120, render: (row: any) => `$${row.total_amount.toFixed(2)}` },
    { key: "status", label: "Status", minWidth: 100, defaultWidth: 140, render: (row: any) => (
      <Badge
        variant="outline"
        className={
          row.status === "Delivered"
            ? "bg-green-50 text-green-700 border-green-200"
            : row.status === "Processing"
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : row.status === "Pending"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-red-50 text-red-700 border-red-200"
        }
      >
        {row.status}
      </Badge>
    ) },
  ]

  const [columnWidths, setColumnWidths] = React.useState<number[]>(columns.map(col => col.defaultWidth || 160))

  const handleWidthsChange = React.useCallback((widths: number[]) => {
    setColumnWidths(widths)
  }, [])

  // Filter, search, and sort logic using props
  const filteredOrders = React.useMemo(() => {
    let data = purchaseOrders
    if (statusFilter) {
      data = data.filter(order => order.status === statusFilter)
    }
    if (search && search.trim()) {
      const s = search.trim().toLowerCase()
      data = data.filter(order =>
        order.id?.toString().toLowerCase().includes(s) ||
        order.suppliers?.name?.toLowerCase().includes(s) ||
        order.status?.toLowerCase().includes(s)
      )
    }
    // Sorting logic
    if (sort === "price-desc") {
      data = [...data].sort((a, b) => b.total_amount - a.total_amount)
    } else if (sort === "price-asc") {
      data = [...data].sort((a, b) => a.total_amount - b.total_amount)
    } else if (sort === "date-desc") {
      data = [...data].sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())
    } else if (sort === "date-asc") {
      data = [...data].sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime())
    }
    return data
  }, [purchaseOrders, search, statusFilter, sort])

  // Helper for each tab
  const getTabData = (tab: string) => {
    if (tab === "all") return filteredOrders
    return filteredOrders.filter(order => order.status === tab.charAt(0).toUpperCase() + tab.slice(1))
  }

  return (
    <>
      {/* No search/filter UI here, only logic */}
      <TabsContent value="all" className="mt-4">
        <Card>
          <ResizableTable columns={columns} data={getTabData("all")} columnWidths={columnWidths} onWidthsChange={handleWidthsChange} />
        </Card>
      </TabsContent>
      <TabsContent value="pending" className="mt-4">
        <Card>
          <ResizableTable columns={columns} data={getTabData("pending")} columnWidths={columnWidths} onWidthsChange={handleWidthsChange} />
        </Card>
      </TabsContent>
      <TabsContent value="processing" className="mt-4">
        <Card>
          <ResizableTable columns={columns} data={getTabData("processing")} columnWidths={columnWidths} onWidthsChange={handleWidthsChange} />
        </Card>
      </TabsContent>
      <TabsContent value="delivered" className="mt-4">
        <Card>
          <ResizableTable columns={columns} data={getTabData("delivered")} columnWidths={columnWidths} onWidthsChange={handleWidthsChange} />
        </Card>
      </TabsContent>
      <TabsContent value="cancelled" className="mt-4">
        <Card>
          <ResizableTable columns={columns} data={getTabData("cancelled")} columnWidths={columnWidths} onWidthsChange={handleWidthsChange} />
        </Card>
      </TabsContent>
    </>
  )
}
