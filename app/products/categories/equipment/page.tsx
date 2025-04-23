import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Plus } from "lucide-react"

export default function EquipmentCategoryPage() {
  // Sample equipment data
  const equipmentItems = [
    {
      id: "EQ001",
      name: "Blood Pressure Monitor",
      manufacturer: "MedTech Inc.",
      model: "BP-2000",
      category: "Diagnostic",
      stock: 12,
      location: "Warehouse A",
      status: "In Stock",
      lastCalibration: "2024-02-15",
      nextCalibration: "2024-08-15",
    },
    {
      id: "EQ002",
      name: "Digital Thermometer",
      manufacturer: "HealthSense",
      model: "DT-500",
      category: "Diagnostic",
      stock: 5,
      location: "Warehouse C",
      status: "Low Stock",
      lastCalibration: "2024-01-10",
      nextCalibration: "2024-07-10",
    },
    {
      id: "EQ003",
      name: "ECG Machine",
      manufacturer: "CardioTech",
      model: "ECG-Pro",
      category: "Diagnostic",
      stock: 3,
      location: "Warehouse B",
      status: "In Stock",
      lastCalibration: "2024-03-05",
      nextCalibration: "2024-09-05",
    },
    {
      id: "EQ004",
      name: "Ultrasound Machine",
      manufacturer: "SonoVision",
      model: "SV-3000",
      category: "Imaging",
      stock: 2,
      location: "Warehouse A",
      status: "In Stock",
      lastCalibration: "2024-02-20",
      nextCalibration: "2024-08-20",
    },
    {
      id: "EQ005",
      name: "Defibrillator",
      manufacturer: "HeartSave",
      model: "HS-100",
      category: "Emergency",
      stock: 4,
      location: "Warehouse B",
      status: "In Stock",
      lastCalibration: "2024-01-25",
      nextCalibration: "2024-07-25",
    },
    {
      id: "EQ006",
      name: "Oxygen Concentrator",
      manufacturer: "AirMed",
      model: "OC-5L",
      category: "Respiratory",
      stock: 0,
      location: "Warehouse C",
      status: "Out of Stock",
      lastCalibration: "2023-12-15",
      nextCalibration: "2024-06-15",
    },
  ]

  return (
    <PageLayout
      title="Equipment Category"
      description="Manage and track your medical equipment inventory"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Add Equipment
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search equipment..." className="pl-9" />
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
                  <TableHead>Equipment ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Calibration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipmentItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.manufacturer}</TableCell>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.category}</TableCell>
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
                    <TableCell>{new Date(item.nextCalibration).toLocaleDateString()}</TableCell>
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
