import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, BarChart, LineChart, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PurchaseHistoryPage() {
  // Sample purchase history data
  const purchaseHistory = [
    {
      id: "PO001",
      date: "2024-04-02",
      supplier: "MedSupply Inc.",
      category: "Consumables",
      items: 24,
      amount: "$12,450.00",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PO002",
      date: "2024-03-15",
      supplier: "LabEquip Co.",
      category: "Equipment",
      items: 5,
      amount: "$8,750.00",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "PO003",
      date: "2024-03-08",
      supplier: "SurgicalTools Ltd.",
      category: "Instruments",
      items: 12,
      amount: "$5,780.00",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PO004",
      date: "2024-02-22",
      supplier: "PharmaChem Co.",
      category: "Reagents",
      items: 18,
      amount: "$4,320.00",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PO005",
      date: "2024-02-10",
      supplier: "MedSupply Inc.",
      category: "Consumables",
      items: 30,
      amount: "$15,200.00",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PO006",
      date: "2024-01-28",
      supplier: "DiagnosticSys Inc.",
      category: "Equipment",
      items: 3,
      amount: "$22,500.00",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "PO007",
      date: "2024-01-15",
      supplier: "MedTech Solutions",
      category: "Consumables",
      items: 45,
      amount: "$9,800.00",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
  ]

  return (
    <PageLayout title="Purchase History" description="View and analyze historical purchase data">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Purchases (YTD)</CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$78,800.00</div>
              <p className="text-xs text-gray-500">137 items purchased</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <LineChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$11,257.14</div>
              <p className="text-xs text-gray-500">+5% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Most Recent Purchase</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Apr 2, 2024</div>
              <p className="text-xs text-gray-500">MedSupply Inc. - $12,450.00</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search purchase history..." className="pl-9" />
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
            <Button variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Time</TabsTrigger>
            <TabsTrigger value="q1">Q1 2024</TabsTrigger>
            <TabsTrigger value="q4">Q4 2023</TabsTrigger>
            <TabsTrigger value="q3">Q3 2023</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseHistory.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-medium">{purchase.id}</TableCell>
                        <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                        <TableCell>{purchase.supplier}</TableCell>
                        <TableCell>{purchase.category}</TableCell>
                        <TableCell className="text-right">{purchase.items}</TableCell>
                        <TableCell className="text-right">{purchase.amount}</TableCell>
                        <TableCell>{purchase.paymentMethod}</TableCell>
                        <TableCell>{purchase.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="q1" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Q1 2024 purchases</div>
            </Card>
          </TabsContent>
          <TabsContent value="q4" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Q4 2023 purchases</div>
            </Card>
          </TabsContent>
          <TabsContent value="q3" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Q3 2023 purchases</div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Trends</CardTitle>
              <CardDescription>Monthly purchase amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Purchase Trends Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Purchases by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <BarChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Category Distribution Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
