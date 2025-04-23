import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function StockUsagePage() {
  return (
    <PageLayout title="Stock Usage Analytics" description="Track and analyze product consumption patterns">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Usage</CardTitle>
              <CardDescription>Items used this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,458</div>
              <p className="text-sm text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Used</CardTitle>
              <CardDescription>Top consumed product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Surgical Gloves</div>
              <p className="text-sm text-gray-500">425 units this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Value</CardTitle>
              <CardDescription>Total cost of consumed items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$12,845</div>
              <p className="text-sm text-gray-500">-3% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Monthly consumption patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Usage Trend Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
              <CardDescription>Usage by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <PieChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Category Breakdown Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Most Used Products</CardTitle>
            <CardDescription>Highest consumption items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <BarChart className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Top Products Chart</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
