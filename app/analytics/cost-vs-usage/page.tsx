import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, DollarSign, TrendingUp, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function CostVsUsagePage() {
  // Sample cost vs usage data
  const costVsUsageData = [
    {
      id: "PROD001",
      name: "Surgical Gloves (Medium)",
      category: "Consumables",
      monthlyCost: "$1,250.00",
      monthlyUsage: 2500,
      costPerUnit: "$0.50",
      costTrend: "-5%",
      usageTrend: "+8%",
      efficiency: "Improving",
    },
    {
      id: "PROD002",
      name: "Disposable Syringes 5ml",
      category: "Consumables",
      monthlyCost: "$850.00",
      monthlyUsage: 3400,
      costPerUnit: "$0.25",
      costTrend: "+2%",
      usageTrend: "+10%",
      efficiency: "Stable",
    },
    {
      id: "PROD003",
      name: "Blood Pressure Monitor",
      category: "Equipment",
      monthlyCost: "$1,800.00",
      monthlyUsage: 12,
      costPerUnit: "$150.00",
      costTrend: "0%",
      usageTrend: "-8%",
      efficiency: "Declining",
    },
    {
      id: "PROD004",
      name: "Glucose Test Strips",
      category: "Reagents",
      monthlyCost: "$960.00",
      monthlyUsage: 320,
      costPerUnit: "$3.00",
      costTrend: "+4%",
      usageTrend: "+15%",
      efficiency: "Improving",
    },
    {
      id: "PROD005",
      name: "Surgical Scissors",
      category: "Instruments",
      monthlyCost: "$450.00",
      monthlyUsage: 15,
      costPerUnit: "$30.00",
      costTrend: "-10%",
      usageTrend: "+5%",
      efficiency: "Improving",
    },
  ]

  return (
    <PageLayout title="Cost vs Usage Analytics" description="Analyze cost efficiency and usage patterns">
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
              <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,850</div>
              <p className="text-xs text-gray-500">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Cost Per Item</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12.45</div>
              <p className="text-xs text-gray-500">-2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Usage Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-gray-500">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cost Trend</CardTitle>
              <LineChart className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Stable</div>
              <p className="text-xs text-gray-500">Slight decrease in Q2</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Cost vs Usage Trends</CardTitle>
              <CardDescription>Monthly cost and usage comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Cost vs Usage Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution by Category</CardTitle>
              <CardDescription>Spending across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <BarChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Cost Distribution Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cost vs Usage Analysis</CardTitle>
            <CardDescription>Detailed breakdown by product</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Monthly Cost</TableHead>
                  <TableHead className="text-right">Monthly Usage</TableHead>
                  <TableHead className="text-right">Cost Per Unit</TableHead>
                  <TableHead>Cost Trend</TableHead>
                  <TableHead>Usage Trend</TableHead>
                  <TableHead>Efficiency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costVsUsageData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.monthlyCost}</TableCell>
                    <TableCell className="text-right">{item.monthlyUsage}</TableCell>
                    <TableCell className="text-right">{item.costPerUnit}</TableCell>
                    <TableCell
                      className={
                        item.costTrend.startsWith("-")
                          ? "text-green-600"
                          : item.costTrend.startsWith("+")
                            ? "text-red-600"
                            : "text-gray-600"
                      }
                    >
                      {item.costTrend}
                    </TableCell>
                    <TableCell
                      className={
                        item.usageTrend.startsWith("+")
                          ? "text-green-600"
                          : item.usageTrend.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-600"
                      }
                    >
                      {item.usageTrend}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.efficiency === "Improving"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : item.efficiency === "Stable"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {item.efficiency}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
