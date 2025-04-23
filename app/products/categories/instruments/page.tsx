import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Plus } from "lucide-react"

export default function InstrumentsCategoryPage() {
  // Sample instruments data
  const instrumentItems = [
    {
      id: "INS001",
      name: "Surgical Scissors",
      type: "Cutting",
      material: "Stainless Steel",
      size: "6 inch",
      stock: 45,
      location: "Warehouse C",
      status: "In Stock",
      lastSterilized: "2024-04-01",
    },
    {
      id: "INS002",
      name: "Forceps",
      type: "Grasping",
      material: "Stainless Steel",
      size: "5 inch",
      stock: 38,
      location: "Warehouse A",
      status: "In Stock",
      lastSterilized: "2024-04-02",
    },
    {
      id: "INS003",
      name: "Scalpel Handle",
      type: "Cutting",
      material: "Stainless Steel",
      size: "4 inch",
      stock: 25,
      location: "Warehouse B",
      status: "In Stock",
      lastSterilized: "2024-04-03",
    },
    {
      id: "INS004",
      name: "Needle Holder",
      type: "Suturing",
      material: "Stainless Steel",
      size: "7 inch",
      stock: 15,
      location: "Warehouse A",
      status: "Low Stock",
      lastSterilized: "2024-04-01",
    },
    {
      id: "INS005",
      name: "Retractor",
      type: "Retracting",
      material: "Stainless Steel",
      size: "8 inch",
      stock: 12,
      location: "Warehouse C",
      status: "Low Stock",
      lastSterilized: "2024-04-02",
    },
    {
      id: "INS006",
      name: "Surgical Clamp",
      type: "Clamping",
      material: "Stainless Steel",
      size: "6 inch",
      stock: 0,
      location: "Warehouse B",
      status: "Out of Stock",
      lastSterilized: "2024-03-25",
    },
  ]

  return (
    <PageLayout
      title="Instruments Category"
      description="Manage and track your surgical instruments inventory"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Add Instrument
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search instruments..." className="pl-9" />
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

        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Instrument ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sterilized</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instrumentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.material}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className="text-right">{item.stock}</TableCell>
                    <TableCell>{item.location}</TableCell>
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
                    <TableCell>{new Date(item.lastSterilized).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
