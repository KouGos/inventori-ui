import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, BarChart, Calendar, AlertTriangle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function ExpiryForecastsPage() {
  // Sample expiry forecast data
  const expiryItems = [
    {
      id: "EXP001",
      product: "Surgical Gloves (Medium)",
      batch: "BT2023-056",
      quantity: 250,
      expiryDate: "2024-05-15",
      daysLeft: 14,
      value: "$112.50",
    },
    {
      id: "EXP002",
      product: "Glucose Test Strips",
      batch: "BT2023-089",
      quantity: 120,
      expiryDate: "2024-06-10",
      daysLeft: 40,
      value: "$360.00",
    },
    {
      id: "EXP003",
      product: "Hemoglobin Reagent",
      batch: "BT2023-102",
      quantity: 45,
      expiryDate: "2024-07-05",
      daysLeft: 65,
      value: "$675.00",
    },
    {
      id: "EXP004",
      product: "Insulin Vials",
      batch: "BT2023-145",
      quantity: 30,
      expiryDate: "2024-08-22",
      daysLeft: 113,
      value: "$1,200.00",
    },
    {
      id: "EXP005",
      product: "Lidocaine Injection",
      batch: "BT2023-201",
      quantity: 60,
      expiryDate: "2024-05-30",
      daysLeft: 29,
      value: "$420.00",
    },
  ]

  return (
    <PageLayout title="Expiry Forecasts" description="Predict and manage product expirations">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs defaultValue="30days">
            <TabsList>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
              <TabsTrigger value="90days">90 Days</TabsTrigger>
              <TabsTrigger value="6months">6 Months</TabsTrigger>
              <TabsTrigger value="1year">1 Year</TabsTrigger>
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
                <SelectItem value="reagents">Reagents</SelectItem>
                <SelectItem value="medications">Medications</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="value">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Expiry Date</SelectItem>
                <SelectItem value="value">Value</SelectItem>
                <SelectItem value="quantity">Quantity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expiring in 30 Days</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">310 items</div>
              <p className="text-xs text-gray-500">Value: $1,532.50</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expiring in 90 Days</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">485 items</div>
              <p className="text-xs text-gray-500">Value: $3,267.00</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Potential Loss</CardTitle>
              <BarChart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,767.50</div>
              <p className="text-xs text-gray-500">If no action taken</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Expiry Trend</CardTitle>
              <LineChart className="h-4 w-4 text-brand-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-12%</div>
              <p className="text-xs text-gray-500">Compared to last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Expiry Timeline</CardTitle>
            <CardDescription>Products expiring in the next 90 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <LineChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Expiry Timeline Chart</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Expirations</CardTitle>
            <CardDescription>Products expiring soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Days Left</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.batch}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.daysLeft <= 30
                            ? "bg-red-50 text-red-700 border-red-200"
                            : item.daysLeft <= 90
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {item.daysLeft} days
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
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
