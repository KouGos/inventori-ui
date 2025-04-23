import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, FileText, Download, Eye, Calendar, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SOPsPage() {
  // Sample SOPs data
  const sops = [
    {
      id: "SOP001",
      title: "Inventory Management Procedures",
      category: "Inventory",
      department: "Warehouse",
      version: "2.3",
      lastUpdated: "2024-03-15",
      updatedBy: "John Smith",
      status: "Active",
    },
    {
      id: "SOP002",
      title: "Product Receiving Guidelines",
      category: "Operations",
      department: "Warehouse",
      version: "1.5",
      lastUpdated: "2024-02-10",
      updatedBy: "Sarah Johnson",
      status: "Active",
    },
    {
      id: "SOP003",
      title: "Quality Control Procedures",
      category: "Quality",
      department: "Quality Assurance",
      version: "3.1",
      lastUpdated: "2024-01-22",
      updatedBy: "Michael Brown",
      status: "Active",
    },
    {
      id: "SOP004",
      title: "Equipment Maintenance Protocol",
      category: "Maintenance",
      department: "Technical",
      version: "2.0",
      lastUpdated: "2023-12-05",
      updatedBy: "Emily Davis",
      status: "Under Review",
    },
    {
      id: "SOP005",
      title: "Emergency Response Procedures",
      category: "Safety",
      department: "All Departments",
      version: "4.2",
      lastUpdated: "2024-04-01",
      updatedBy: "Robert Wilson",
      status: "Active",
    },
    {
      id: "SOP006",
      title: "Product Storage Guidelines",
      category: "Inventory",
      department: "Warehouse",
      version: "1.8",
      lastUpdated: "2023-11-18",
      updatedBy: "Jennifer Lee",
      status: "Active",
    },
  ]

  return (
    <PageLayout
      title="Standard Operating Procedures (SOPs)"
      description="Manage and access standardized procedures and guidelines"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Create SOP
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search SOPs..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="quality">Quality</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All SOPs</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sops.map((sop) => (
                <Card key={sop.id} className="overflow-hidden">
                  <div className="h-2 bg-brand-600"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{sop.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          sop.status === "Active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : sop.status === "Under Review"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {sop.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FileText className="h-4 w-4 mr-1" />
                      {sop.id} • Version {sop.version}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Category:</span>
                        </div>
                        <span className="text-sm font-medium">{sop.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Department:</span>
                        </div>
                        <span className="text-sm font-medium">{sop.department}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>Last Updated:</span>
                        </div>
                        <span className="text-sm font-medium">{new Date(sop.lastUpdated).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500">Updated By:</span>
                        </div>
                        <span className="text-sm font-medium">{sop.updatedBy}</span>
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
          <TabsContent value="active" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Active SOPs</div>
            </Card>
          </TabsContent>
          <TabsContent value="review" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for SOPs Under Review</div>
            </Card>
          </TabsContent>
          <TabsContent value="draft" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Draft SOPs</div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Last SOP update: April 1, 2024</span>
          </div>
          <Button variant="outline" size="sm">
            View Revision History
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
