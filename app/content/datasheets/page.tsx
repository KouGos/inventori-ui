import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, FileText, Download, Eye, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DatasheetsPage() {
  // Sample datasheets data
  const datasheets = [
    {
      id: "DS001",
      title: "Surgical Gloves (Medium)",
      productId: "PROD001",
      category: "Consumables",
      manufacturer: "MedSupply Inc.",
      lastUpdated: "2024-03-10",
      fileType: "PDF",
      fileSize: "1.2 MB",
    },
    {
      id: "DS002",
      title: "Blood Pressure Monitor",
      productId: "PROD003",
      category: "Equipment",
      manufacturer: "LabEquip Co.",
      lastUpdated: "2024-02-15",
      fileType: "PDF",
      fileSize: "2.5 MB",
    },
    {
      id: "DS003",
      title: "Surgical Scissors",
      productId: "PROD005",
      category: "Instruments",
      manufacturer: "SurgicalTools Ltd.",
      lastUpdated: "2024-01-20",
      fileType: "PDF",
      fileSize: "0.8 MB",
    },
    {
      id: "DS004",
      title: "Glucose Test Strips",
      productId: "PROD004",
      category: "Reagents",
      manufacturer: "PharmaChem Co.",
      lastUpdated: "2024-03-05",
      fileType: "PDF",
      fileSize: "1.5 MB",
    },
    {
      id: "DS005",
      title: "Digital Thermometer",
      productId: "PROD007",
      category: "Equipment",
      manufacturer: "MedTech Solutions",
      lastUpdated: "2024-02-28",
      fileType: "PDF",
      fileSize: "1.1 MB",
    },
    {
      id: "DS006",
      title: "Surgical Masks",
      productId: "PROD006",
      category: "Consumables",
      manufacturer: "MedSupply Inc.",
      lastUpdated: "2024-03-15",
      fileType: "PDF",
      fileSize: "0.9 MB",
    },
    {
      id: "DS007",
      title: "Hemoglobin Reagent",
      productId: "PROD008",
      category: "Reagents",
      manufacturer: "PharmaChem Co.",
      lastUpdated: "2024-01-30",
      fileType: "PDF",
      fileSize: "1.3 MB",
    },
    {
      id: "DS008",
      title: "IV Catheter 20G",
      productId: "PROD010",
      category: "Consumables",
      manufacturer: "MedSupply Inc.",
      lastUpdated: "2024-02-20",
      fileType: "PDF",
      fileSize: "1.0 MB",
    },
    {
      id: "DS009",
      title: "Surgical Drapes",
      productId: "PROD012",
      category: "Consumables",
      manufacturer: "SurgicalTools Ltd.",
      lastUpdated: "2024-03-01",
      fileType: "PDF",
      fileSize: "1.4 MB",
    },
  ]

  return (
    <PageLayout
      title="Product Datasheets"
      description="Access technical specifications and documentation for products"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Upload Datasheet
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search datasheets..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="consumables">Consumables</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="instruments">Instruments</SelectItem>
                <SelectItem value="reagents">Reagents</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Datasheets</TabsTrigger>
            <TabsTrigger value="consumables">Consumables</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="instruments">Instruments</TabsTrigger>
            <TabsTrigger value="reagents">Reagents</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {datasheets.map((datasheet) => (
                <Card key={datasheet.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{datasheet.title}</h3>
                      <Badge variant="outline" className="bg-gray-100">
                        {datasheet.fileType}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FileText className="h-4 w-4 mr-1" />
                      {datasheet.productId} • {datasheet.fileSize}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Category:</span>
                        </div>
                        <span className="text-sm font-medium">{datasheet.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Manufacturer:</span>
                        </div>
                        <span className="text-sm font-medium">{datasheet.manufacturer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>Last Updated:</span>
                        </div>
                        <span className="text-sm font-medium">
                          {new Date(datasheet.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <Button variant="outline" size="sm" className="flex gap-2">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                      <Button size="sm" className="bg-brand-600 hover:bg-brand-700 flex gap-2">
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="consumables" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Consumables datasheets</div>
            </Card>
          </TabsContent>
          <TabsContent value="equipment" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Equipment datasheets</div>
            </Card>
          </TabsContent>
          <TabsContent value="instruments" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Instruments datasheets</div>
            </Card>
          </TabsContent>
          <TabsContent value="reagents" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Reagents datasheets</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
