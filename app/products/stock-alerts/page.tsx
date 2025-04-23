import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddStockAlertButton } from "@/components/add-stock-alert-button"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function StockAlertsPage() {
  // Fetch stock alerts from Supabase
  const supabase = createServerSupabaseClient()
  const { data: stockAlerts, error } = await supabase.from("stock_alerts").select("*")

  if (error) {
    console.error("Error fetching stock alerts:", error)
  }

  return (
    <PageLayout
      title="Stock Alerts"
      description="Monitor low stock and out of stock items"
      headerAction={
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Settings className="h-4 w-4" /> Configure Thresholds
          </Button>
          <AddStockAlertButton />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search alerts..." className="pl-9" />
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
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Current Stock</TableHead>
                      <TableHead className="text-right">Min Threshold</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockAlerts &&
                      stockAlerts.map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell className="font-medium">{alert.product}</TableCell>
                          <TableCell>{alert.sku}</TableCell>
                          <TableCell>{alert.category}</TableCell>
                          <TableCell className="text-right">{alert.current_stock}</TableCell>
                          <TableCell className="text-right">{alert.min_threshold}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                alert.status === "Out of Stock"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {alert.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(alert.last_updated).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="low-stock" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Low Stock items</div>
            </Card>
          </TabsContent>
          <TabsContent value="out-of-stock" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Out of Stock items</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
