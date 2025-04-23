import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Plus } from "lucide-react"

export default function ReagentsCategoryPage() {
  // Sample reagents data
  const reagentItems = [
    {
      id: "REA001",
      name: "Glucose Test Strips",
      type: "Diagnostic",
      manufacturer: "DiagnosticLabs",
      lotNumber: "GL2024-001",
      stock: 320,
      unit: "pcs",
      location: "Warehouse B",
      status: "In Stock",
      expiry: "2024-12-10",
    },
    {
      id: "REA002",
      name: "Hemoglobin Reagent",
      type: "Hematology",
      manufacturer: "BloodTech",
      lotNumber: "HB2024-002",
      stock: 0,
      unit: "kits",
      location: "Warehouse B",
      status: "Out of Stock",
      expiry: "2024-09-05",
    },
    {
      id: "REA003",
      name: "Liver Function Test Kit",
      type: "Biochemistry",
      manufacturer: "BioAssay",
      lotNumber: "LF2024-003",
      stock: 15,
      unit: "kits",
      location: "Warehouse A",
      status: "Low Stock",
      expiry: "2024-10-15",
    },
    {
      id: "REA004",
      name: "Urine Test Strips",
      type: "Urinalysis",
      manufacturer: "DiagnosticLabs",
      lotNumber: "UT2024-004",
      stock: 250,
      unit: "pcs",
      location: "Warehouse C",
      status: "In Stock",
      expiry: "2025-01-20",
    },
    {
      id: "REA005",
      name: "Cholesterol Test Kit",
      type: "Lipid Profile",
      manufacturer: "CardioTest",
      lotNumber: "CT2024-005",
      stock: 8,
      unit: "kits",
      location: "Warehouse A",
      status: "Low Stock",
      expiry: "2024-11-30",
    },
    {
      id: "REA006",
      name: "COVID-19 Rapid Test",
      type: "Infectious Disease",
      manufacturer: "ViralDetect",
      lotNumber: "CV2024-006",
      stock: 180,
      unit: "pcs",
      location: "Warehouse B",
      status: "In Stock",
      expiry: "2024-08-15",
    },
  ]

  return (
    <PageLayout
      title="Reagents Category"
      description="Manage and track your laboratory reagents inventory"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Add Reagent
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search reagents..." className="pl-9" />
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
                  <TableHead>Reagent ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Lot Number</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reagentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.manufacturer}</TableCell>
                    <TableCell>{item.lotNumber}</TableCell>
                    <TableCell className="text-right">
                      {item.stock} {item.unit}
                    </TableCell>
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
                    <TableCell>{new Date(item.expiry).toLocaleDateString()}</TableCell>
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
