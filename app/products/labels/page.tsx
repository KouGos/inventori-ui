import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, QrCode, Barcode, Printer } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LabelsPage() {
  // Sample label templates
  const labelTemplates = [
    {
      id: "LT001",
      name: "Standard Barcode",
      type: "Barcode",
      size: "2\" x 1\"",
      description: "Standard product barcode label",
      icon: <Barcode className="h-8 w-8" />,
    },
    {
      id: "LT002",
      name: "Inventory QR Code",
      type: "QR Code",
      size: "2\" x 2\"",
      description: "QR code with product details",
      icon: <QrCode className="h-8 w-8" />,
    },
    {
      id: "LT003",
      name: "Asset Tag",
      type: "Barcode",
      size: "3\" x 1\"",
      description: "Equipment asset tracking label",
      icon: <Barcode className="h-8 w-8" />,
    },
    {
      id: "LT004",
      name: "Location QR Code",
      type: "QR Code",
      size: "3\" x 3\"",
      description: "Location identifier for warehouses",
      icon: <QrCode className="h-8 w-8" />,
    },
    {
      id: "LT005",
      name: "Expiry Date Label",
      type: "Barcode",
      size: "2\" x 1\"",
      description: "Label with product expiry information",
      icon: <Barcode className="h-8 w-8" />,
    },
    {
      id: "LT006",
      name: "Batch Tracking",
      type: "QR Code",
      size: "2\" x 2\"",
      description: "QR code for batch and lot tracking",
      icon: <QrCode className="h-8 w-8" />,
    },
  ]

  return (
    <PageLayout
      title="Barcode & QR Labels"
      description="Generate and print barcode and QR code labels for inventory management"
      headerAction={
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="mr-2 h-4 w-4" /> Create Label
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search templates..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Label Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="barcode">Barcode</SelectItem>
                <SelectItem value="qrcode">QR Code</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="templates">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="recent">Recently Printed</TabsTrigger>
            <TabsTrigger value="custom">Custom Labels</TabsTrigger>
          </TabsList>
          <TabsContent value="templates" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {labelTemplates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-24 bg-gray-50 rounded-md mb-4">
                      {template.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">{template.type}</span>
                      <span className="text-sm text-gray-500">{template.size}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{template.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Recently printed labels will appear here</div>
            </Card>
          </TabsContent>
          <TabsContent value="custom" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Custom label designs will appear here</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
