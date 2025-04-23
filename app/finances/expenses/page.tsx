import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, DollarSign, PieChart, TrendingUp, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExpensesPage() {
  // Sample expenses data
  const expenses = [
    {
      id: "EXP001",
      date: "2024-04-02",
      category: "Inventory Purchase",
      supplier: "MedSupply Inc.",
      description: "Surgical supplies quarterly order",
      amount: "$12,450.00",
      paymentMethod: "Bank Transfer",
      status: "Paid",
    },
    {
      id: "EXP002",
      date: "2024-04-05",
      category: "Equipment",
      supplier: "LabEquip Co.",
      description: "Laboratory equipment maintenance",
      amount: "$3,250.00",
      paymentMethod: "Credit Card",
      status: "Paid",
    },
    {
      id: "EXP003",
      date: "2024-04-08",
      category: "Inventory Purchase",
      supplier: "SurgicalTools Ltd.",
      description: "Surgical instruments order",
      amount: "$5,780.00",
      paymentMethod: "Bank Transfer",
      status: "Pending",
    },
    {
      id: "EXP004",
      date: "2024-04-10",
      category: "Utilities",
      supplier: "City Power Co.",
      description: "Monthly electricity bill",
      amount: "$1,850.00",
      paymentMethod: "Direct Debit",
      status: "Paid",
    },
    {
      id: "EXP005",
      date: "2024-04-12",
      category: "Inventory Purchase",
      supplier: "PharmaChem Co.",
      description: "Reagents and chemicals order",
      amount: "$4,320.00",
      paymentMethod: "Bank Transfer",
      status: "Pending",
    },
    {
      id: "EXP006",
      date: "2024-04-15",
      category: "Services",
      supplier: "CleanTech Services",
      description: "Monthly cleaning service",
      amount: "$2,200.00",
      paymentMethod: "Credit Card",
      status: "Paid",
    },
    {
      id: "EXP007",
      date: "2024-04-18",
      category: "Equipment",
      supplier: "MedTech Solutions",
      description: "Equipment repair service",
      amount: "$1,750.00",
      paymentMethod: "Credit Card",
      status: "Paid",
    },
  ]

  return (
    <PageLayout
      title="Expenses"
      description="Track and manage all expenses"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses (MTD)</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$31,600.00</div>
              <p className="text-xs text-gray-500">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$10,100.00</div>
              <p className="text-xs text-gray-500">2 pending expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Largest Category</CardTitle>
              <PieChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Inventory</div>
              <p className="text-xs text-gray-500">72% of total expenses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Increasing</div>
              <p className="text-xs text-gray-500">+12% over 3 months</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search expenses..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="inventory">Inventory Purchase</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="services">Services</SelectItem>
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
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.supplier}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell className="text-right">{expense.amount}</TableCell>
                        <TableCell>{expense.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              expense.status === "Paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {expense.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Paid expenses</div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Pending expenses</div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <PieChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Expense Breakdown Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Expense Trend</CardTitle>
              <CardDescription>Expense trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <TrendingUp className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Expense Trend Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
