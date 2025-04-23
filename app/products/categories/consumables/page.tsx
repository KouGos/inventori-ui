import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConsumablesPage() {
  // Sample consumables data
  const consumables = [
    {
      id: "CONS001",
      name: "Surgical Gloves (Medium)",
      sku: "SG-M-001",
      subcategory: "Gloves & PPE",
      stock: 1250,
      unit: "pairs",
      status: "In Stock",
      price: "$0.45",
    },
    {
      id: "CONS002",
      name: "Disposable Syringes 5ml",
      sku: "DS-5ML-002",
      subcategory: "Syringes & Needles",
      stock: 850,
      unit: "pcs",
      status: "In Stock",
      price: "$0.25",
    },
    {
      id: "CONS003",
      name: "Surgical Masks",
      sku: "SM-006",
      subcategory: "Gloves & PPE",
      stock: 1800,
      unit: "pcs",
      status: "In Stock",
      price: "$0.15",
    },
    {
      id: "CONS004",
      name: 'Sterile Gauze Pads 4"x4"',
      sku: "GP-4X4-008",
      subcategory: "Bandages & Dressings",
      stock: 750,
      unit: "pcs",
      status: "In Stock",
      price: "$0.30",
    },
    {
      id: "CONS005",
      name: "IV Catheter 20G",
      sku: "IV-20G-010",
      subcategory: "IV Supplies",
      stock: 320,
      unit: "pcs",
      status: "Low Stock",
      price: "$1.25",
    },
    {
      id: "CONS006",
      name: "Surgical Drapes",
      sku: "SD-012",
      subcategory: "Surgical Supplies",
      stock: 180,
      unit: "pcs",
      status: "In Stock",
      price: "$2.50",
    },
    {
      id: "CONS007",
      name: "Disposable Gowns",
      sku: "DG-014",
      subcategory: "Gloves & PPE",
      stock: 210,
      unit: "pcs",
      status: "In Stock",
      price: "$3.75",
    },
    {
      id: "CONS008",
      name: "Adhesive Bandages",
      sku: "AB-016",
      subcategory: "Bandages & Dressings",
      stock: 950,
      unit: "pcs",
      status: "In Stock",
      price: "$0.10",
    },
  ]

  return (
    <PageLayout
      title={
        <div className="flex items-center">
          <Link href="/products/categories" className="mr-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          Consumables
        </div>
      }
      description="Disposable medical supplies used in patient care"
      headerAction={
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search consumables..." className="pl-9" />
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
            <TabsTrigger value="gloves">Gloves & PPE</TabsTrigger>
            <TabsTrigger value="syringes">Syringes & Needles</TabsTrigger>
            <TabsTrigger value="bandages">Bandages & Dressings</TabsTrigger>
            <TabsTrigger value="iv">IV Supplies</TabsTrigger>
            <TabsTrigger value="surgical">Surgical Supplies</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Subcategory</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consumables.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.subcategory}</TableCell>
                        <TableCell className="text-right">
                          {item.stock} {item.unit}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "In Stock"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : item.status === "Low Stock"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="gloves" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Gloves & PPE</div>
            </Card>
          </TabsContent>
          <TabsContent value="syringes" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Syringes & Needles</div>
            </Card>
          </TabsContent>
          <TabsContent value="bandages" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Bandages & Dressings</div>
            </Card>
          </TabsContent>
          <TabsContent value="iv" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for IV Supplies</div>
            </Card>
          </TabsContent>
          <TabsContent value="surgical" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Surgical Supplies</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
