import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Eye, Trash, FileText, FileImage, FileArchive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UploadFileButton } from "@/components/upload-file-button"

export default function UploadsPage() {
  // Sample uploads data
  const uploads = [
    {
      id: "UPL001",
      filename: "inventory_report_q1_2024.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "John Smith",
      uploadDate: "2024-04-02",
      category: "Reports",
      tags: ["inventory", "quarterly", "2024"],
    },
    {
      id: "UPL002",
      filename: "supplier_contracts_2024.pdf",
      type: "PDF",
      size: "3.8 MB",
      uploadedBy: "Sarah Johnson",
      uploadDate: "2024-03-15",
      category: "Contracts",
      tags: ["suppliers", "legal", "2024"],
    },
    {
      id: "UPL003",
      filename: "warehouse_layout_2024.jpg",
      type: "Image",
      size: "1.2 MB",
      uploadedBy: "Michael Brown",
      uploadDate: "2024-03-10",
      category: "Diagrams",
      tags: ["warehouse", "layout", "floorplan"],
    },
    {
      id: "UPL004",
      filename: "equipment_maintenance_schedule.xlsx",
      type: "Spreadsheet",
      size: "0.8 MB",
      uploadedBy: "Emily Davis",
      uploadDate: "2024-03-05",
      category: "Schedules",
      tags: ["equipment", "maintenance", "schedule"],
    },
    {
      id: "UPL005",
      filename: "staff_training_materials.zip",
      type: "Archive",
      size: "15.6 MB",
      uploadedBy: "Robert Wilson",
      uploadDate: "2024-02-28",
      category: "Training",
      tags: ["staff", "training", "materials"],
    },
    {
      id: "UPL006",
      filename: "product_images_batch_march2024.zip",
      type: "Archive",
      size: "24.2 MB",
      uploadedBy: "Jennifer Lee",
      uploadDate: "2024-03-25",
      category: "Images",
      tags: ["products", "images", "batch"],
    },
    {
      id: "UPL007",
      filename: "inventory_audit_procedures.pdf",
      type: "PDF",
      size: "1.5 MB",
      uploadedBy: "John Smith",
      uploadDate: "2024-03-20",
      category: "Procedures",
      tags: ["inventory", "audit", "procedures"],
    },
  ]

  // Function to render file icon based on type
  const renderFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-500" />
      case "Image":
        return <FileImage className="h-5 w-5 text-blue-500" />
      case "Archive":
        return <FileArchive className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <PageLayout
      title="File Uploads"
      description="Manage uploaded files and documents"
      headerAction={<UploadFileButton />}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search files..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="archives">Archives</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Uploaded By</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploads.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {renderFileIcon(file.type)}
                            <span className="ml-2 font-medium">{file.filename}</span>
                          </div>
                        </TableCell>
                        <TableCell>{file.type}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.uploadedBy}</TableCell>
                        <TableCell>{new Date(file.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100">
                            {file.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {file.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="bg-brand-50 text-brand-700 border-brand-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Documents</div>
            </Card>
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Images</div>
            </Card>
          </TabsContent>
          <TabsContent value="archives" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Archives</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
