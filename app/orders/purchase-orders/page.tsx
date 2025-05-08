import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddPurchaseOrderButton } from "@/components/add-purchase-order-button"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function PurchaseOrdersPage() {
  // Fetch purchase orders from Supabase
  const supabase = createServerSupabaseClient()
  const { data: purchaseOrders, error } = await supabase.from("purchase_orders").select("*, suppliers(name)")

  if (error) {
    console.error("Error fetching purchase orders:", error)
  }

  return (
    <PageLayout
      title="Purchase Orders"
      description="Manage your purchase orders"
      headerAction={<AddPurchaseOrderButton />}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
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
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrders &&
                      purchaseOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.suppliers?.name || "Unknown"}</TableCell>
                          <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">${order.total_amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                order.status === "Delivered"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : order.status === "Processing"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : order.status === "Pending"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Pending orders</div>
            </Card>
          </TabsContent>
          <TabsContent value="processing" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Processing orders</div>
            </Card>
          </TabsContent>
          <TabsContent value="delivered" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Delivered orders</div>
            </Card>
          </TabsContent>
          <TabsContent value="cancelled" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Cancelled orders</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
