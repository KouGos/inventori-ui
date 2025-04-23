import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrderFrequencyPage() {
  // Sample top ordered products data
  const topOrderedProducts = [
    {
      id: "PROD001",
      name: "Surgical Gloves (Medium)",
      category: "Consumables",
      orderCount: 42,
      lastOrdered: "2024-04-10",
      trend: "+12%",
    },
    {
      id: "PROD002",
      name: "Disposable Syringes 5ml",
      category: "Consumables",
      orderCount: 38,
      lastOrdered: "2024-04-12",
      trend: "+8%",
    },
    {
      id: "PROD003",
      name: "Surgical Masks",
      category: "Consumables",
      orderCount: 35,
      lastOrdered: "2024-04-08",
      trend: "+15%",
    },
    {
      id: "PROD004",
      name: "Glucose Test Strips",
      category: "Reagents",
      orderCount: 28,
      lastOrdered: "2024-04-15",
      trend: "-3%",
    },
    {
      id: "PROD005",
      name: "IV Catheter 20G",
      category: "Consumables",
      orderCount: 25,
      lastOrdered: "2024-04-11",
      trend: "+5%",
    },
  ]

  // Sample suppliers data
  const topSuppliers = [
    {
      id: "SUP001",
      name: "MedSupply Inc.",
      orderCount: 24,
      lastOrder: "2024-04-15",
      trend: "+8%",
    },
    {
      id: "SUP002",
      name: "LabEquip Co.",
      orderCount: 18,
      lastOrder: "2024-04-12",
      trend: "+2%",
    },
    {
      id: "SUP003",
      name: "SurgicalTools Ltd.",
      orderCount: 15,
      lastOrder: "2024-04-10",
      trend: "-5%",
    },
    {
      id: "SUP004",
      name: "PharmaChem Co.",
      orderCount: 12,
      lastOrder: "2024-04-08",
      trend: "+10%",
    },
    {
      id: "SUP005",
      name: "DiagnosticSys Inc.",
      orderCount: 10,
      lastOrder: "2024-04-05",
      trend: "0%",
    },
  ]

  return (
    <PageLayout title="Order Frequency Analytics" description="Analyze ordering patterns and trends">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs defaultValue="monthly">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4">
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

            <Select defaultValue="2024">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <BarChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Order Size</CardTitle>
              <LineChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 items</div>
              <p className="text-xs text-gray-500">-3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reorder Frequency</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5 days</div>
              <p className="text-xs text-gray-500">+1 day from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Category Distribution</CardTitle>
              <PieChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4 categories</div>
              <p className="text-xs text-gray-500">Consumables lead at 65%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Frequency Trends</CardTitle>
              <CardDescription>Monthly ordering patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Order Frequency Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Volume by Category</CardTitle>
              <CardDescription>Distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <PieChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Category Distribution Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Most Frequently Ordered Products</CardTitle>
              <CardDescription>Top products by order frequency</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Order Count</TableHead>
                    <TableHead>Last Ordered</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topOrderedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">{product.orderCount}</TableCell>
                      <TableCell>{new Date(product.lastOrdered).toLocaleDateString()}</TableCell>
                      <TableCell
                        className={
                          product.trend.startsWith("+")
                            ? "text-green-600"
                            : product.trend.startsWith("-")
                              ? "text-red-600"
                              : "text-gray-600"
                        }
                      >
                        {product.trend}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Suppliers by Order Frequency</CardTitle>
              <CardDescription>Suppliers with most frequent orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Order Count</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                      <TableCell className="font-medium">{supplier.name}</TableCell>
                      <TableCell className="text-right">{supplier.orderCount}</TableCell>
                      <TableCell>{new Date(supplier.lastOrder).toLocaleDateString()}</TableCell>
                      <TableCell
                        className={
                          supplier.trend.startsWith("+")
                            ? "text-green-600"
                            : supplier.trend.startsWith("-")
                              ? "text-red-600"
                              : "text-gray-600"
                        }
                      >
                        {supplier.trend}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
