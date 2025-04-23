import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddProductButton } from "@/components/add-product-button"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function InventoryPage() {
  // Fetch products from Supabase
  const supabase = createServerSupabaseClient()
  const { data: products, error } = await supabase.from("products").select("*")

  if (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <PageLayout title="Inventory" description="Manage your medical inventory" headerAction={<AddProductButton />}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search products..." className="pl-9" />
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
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="expiring-soon">Expiring Soon</TabsTrigger>
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
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products &&
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.sku}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">{product.stock}</TableCell>
                          <TableCell>{product.unit}</TableCell>
                          <TableCell>{product.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                product.status === "In Stock"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : product.status === "Low Stock"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {product.expiry ? new Date(product.expiry).toLocaleDateString() : "N/A"}
                          </TableCell>
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
          <TabsContent value="expiring-soon" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Expiring Soon items</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
