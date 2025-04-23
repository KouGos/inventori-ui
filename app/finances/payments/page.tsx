import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, Eye } from "lucide-react"

export default function PaymentsPage() {
  // Sample payments data
  const payments = [
    {
      id: "PAY001",
      date: "2024-04-02",
      supplier: "MedSupply Inc.",
      invoiceId: "INV001",
      amount: "$12,450.00",
      method: "Bank Transfer",
      status: "Completed",
      reference: "BT-24042-001",
    },
    {
      id: "PAY002",
      date: "2024-04-05",
      supplier: "LabEquip Co.",
      invoiceId: "INV002",
      amount: "$3,250.00",
      method: "Credit Card",
      status: "Completed",
      reference: "CC-24045-002",
    },
    {
      id: "PAY003",
      date: "2024-04-08",
      supplier: "SurgicalTools Ltd.",
      invoiceId: "INV003",
      amount: "$5,780.00",
      method: "Bank Transfer",
      status: "Processing",
      reference: "BT-24048-003",
    },
    {
      id: "PAY004",
      date: "2024-04-10",
      supplier: "City Power Co.",
      invoiceId: "INV004",
      amount: "$1,850.00",
      method: "Direct Debit",
      status: "Scheduled",
      reference: "DD-24040-004",
    },
    {
      id: "PAY005",
      date: "2024-04-12",
      supplier: "PharmaChem Co.",
      invoiceId: "INV005",
      amount: "$4,320.00",
      method: "Bank Transfer",
      status: "Scheduled",
      reference: "BT-24042-005",
    },
    {
      id: "PAY006",
      date: "2024-04-15",
      supplier: "CleanTech Services",
      invoiceId: "INV006",
      amount: "$2,200.00",
      method: "Credit Card",
      status: "Completed",
      reference: "CC-24045-006",
    },
    {
      id: "PAY007",
      date: "2024-03-20",
      supplier: "MedTech Solutions",
      invoiceId: "INV007",
      amount: "$1,750.00",
      method: "Credit Card",
      status: "Failed",
      reference: "CC-24030-007",
    },
  ]

  return (
    <PageLayout
      title="Payments"
      description="Manage and track payments to suppliers"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> New Payment
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search payments..." className="pl-9" />
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
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Invoice</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.supplier}</TableCell>
                        <TableCell>{payment.invoiceId}</TableCell>
                        <TableCell className="text-right">{payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              payment.status === "Completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : payment.status === "Processing"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : payment.status === "Scheduled"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Completed payments</div>
            </Card>
          </TabsContent>
          <TabsContent value="processing" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Processing payments</div>
            </Card>
          </TabsContent>
          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Scheduled payments</div>
            </Card>
          </TabsContent>
          <TabsContent value="failed" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Failed payments</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
