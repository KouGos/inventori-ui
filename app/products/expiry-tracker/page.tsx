import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Bell } from "lucide-react"

export default function ExpiryTrackerPage() {
  // Sample expiry data
  const expiryItems = [
    {
      id: "INV001",
      name: "Surgical Gloves (Medium)",
      batch: "BT2023-056",
      category: "Consumables",
      stock: 250,
      location: "Warehouse A",
      expiry: "2024-05-15",
      daysLeft: 14,
      status: "Critical",
    },
    {
      id: "INV005",
      name: "Glucose Test Strips",
      batch: "BT2023-089",
      category: "Reagents",
      stock: 120,
      location: "Warehouse B",
      expiry: "2024-06-10",
      daysLeft: 40,
      status: "Warning",
    },
    {
      id: "INV008",
      name: "Hemoglobin Reagent",
      batch: "BT2023-102",
      category: "Reagents",
      stock: 45,
      location: "Warehouse B",
      expiry: "2024-07-05",
      daysLeft: 65,
      status: "Warning",
    },
    {
      id: "INV012",
      name: "Insulin Vials",
      batch: "BT2023-145",
      category: "Consumables",
      stock: 30,
      location: "Warehouse A",
      expiry: "2024-08-22",
      daysLeft: 113,
      status: "Good",
    },
    {
      id: "INV018",
      name: "Rapid Strep Test Kits",
      batch: "BT2023-178",
      category: "Reagents",
      stock: 85,
      location: "Warehouse C",
      expiry: "2024-09-15",
      daysLeft: 137,
      status: "Good",
    },
    {
      id: "INV023",
      name: "Lidocaine Injection",
      batch: "BT2023-201",
      category: "Consumables",
      stock: 60,
      location: "Warehouse A",
      expiry: "2024-05-30",
      daysLeft: 29,
      status: "Warning",
    },
  ]

  return (
    <PageLayout
      title="Expiry Tracker"
      description="Monitor and manage product expiration dates"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Bell className="h-4 w-4 mr-2" /> Set Alerts
        </Button>
      }
    >
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
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical (30 days)</TabsTrigger>
            <TabsTrigger value="warning">Warning (90 days)</TabsTrigger>
            <TabsTrigger value="good">Good (90+ days)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expiryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.batch}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">{item.stock}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{new Date(item.expiry).toLocaleDateString()}</TableCell>
                        <TableCell>{item.daysLeft}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "Critical"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : item.status === "Warning"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="critical" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">
                Filtered view for Critical expiry items (30 days or less)
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="warning" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Warning expiry items (31-90 days)</div>
            </Card>
          </TabsContent>
          <TabsContent value="good" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Good expiry items (90+ days)</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
