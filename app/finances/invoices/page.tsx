import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, FileText, Eye, Printer } from "lucide-react"

export default function InvoicesPage() {
  // Sample invoices data
  const invoices = [
    {
      id: "INV001",
      date: "2024-04-02",
      supplier: "MedSupply Inc.",
      description: "Surgical supplies quarterly order",
      amount: "$12,450.00",
      dueDate: "2024-05-02",
      status: "Paid",
    },
    {
      id: "INV002",
      date: "2024-04-05",
      supplier: "LabEquip Co.",
      description: "Laboratory equipment maintenance",
      amount: "$3,250.00",
      dueDate: "2024-05-05",
      status: "Paid",
    },
    {
      id: "INV003",
      date: "2024-04-08",
      supplier: "SurgicalTools Ltd.",
      description: "Surgical instruments order",
      amount: "$5,780.00",
      dueDate: "2024-05-08",
      status: "Pending",
    },
    {
      id: "INV004",
      date: "2024-04-10",
      supplier: "City Power Co.",
      description: "Monthly electricity bill",
      amount: "$1,850.00",
      dueDate: "2024-04-25",
      status: "Pending",
    },
    {
      id: "INV005",
      date: "2024-04-12",
      supplier: "PharmaChem Co.",
      description: "Reagents and chemicals order",
      amount: "$4,320.00",
      dueDate: "2024-05-12",
      status: "Pending",
    },
    {
      id: "INV006",
      date: "2024-04-15",
      supplier: "CleanTech Services",
      description: "Monthly cleaning service",
      amount: "$2,200.00",
      dueDate: "2024-04-30",
      status: "Pending",
    },
    {
      id: "INV007",
      date: "2024-03-18",
      supplier: "MedTech Solutions",
      description: "Equipment repair service",
      amount: "$1,750.00",
      dueDate: "2024-04-17",
      status: "Overdue",
    },
  ]

  return (
    <PageLayout
      title="Invoices"
      description="Manage supplier invoices and payments"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Add Invoice
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-center">
              <div className="mr-4 bg-amber-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-amber-800">Pending</div>
                <div className="text-2xl font-bold text-amber-700">$14,150.00</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center">
              <div className="mr-4 bg-red-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-red-800">Overdue</div>
                <div className="text-2xl font-bold text-red-700">$1,750.00</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center">
              <div className="mr-4 bg-green-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-800">Paid (This Month)</div>
                <div className="text-2xl font-bold text-green-700">$15,700.00</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search invoices..." className="pl-9" />
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
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>{invoice.supplier}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell className="text-right">{invoice.amount}</TableCell>
                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              invoice.status === "Paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : invoice.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Printer className="h-4 w-4" />
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
          <TabsContent value="pending" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Pending invoices</div>
            </Card>
          </TabsContent>
          <TabsContent value="overdue" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Overdue invoices</div>
            </Card>
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Paid invoices</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
