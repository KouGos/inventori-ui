import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddWarehouseButton } from "@/components/add-warehouse-button"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function WarehousesPage() {
  // Fetch warehouses from Supabase
  const supabase = createServerSupabaseClient()
  const { data: warehouses, error } = await supabase.from("warehouses").select("*")

  if (error) {
    console.error("Error fetching warehouses:", error)
  }

  return (
    <PageLayout title="Warehouses" description="Manage your warehouse locations" headerAction={<AddWarehouseButton />}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search warehouses..." className="pl-9" />
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
            <TabsTrigger value="all">All Warehouses</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Temperature</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Products</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouses &&
                      warehouses.map((warehouse) => (
                        <TableRow key={warehouse.id}>
                          <TableCell className="font-medium">{warehouse.name}</TableCell>
                          <TableCell>{warehouse.location}</TableCell>
                          <TableCell>{warehouse.manager}</TableCell>
                          <TableCell>{warehouse.capacity}</TableCell>
                          <TableCell>{warehouse.temperature}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                warehouse.status === "Active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : warehouse.status === "Maintenance"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {warehouse.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{warehouse.products_count}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Active warehouses</div>
            </Card>
          </TabsContent>
          <TabsContent value="maintenance" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Maintenance warehouses</div>
            </Card>
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Inactive warehouses</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
