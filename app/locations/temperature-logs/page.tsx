import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Thermometer, AlertTriangle, LineChart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TemperatureLogsPage() {
  // Sample temperature logs data
  const temperatureLogs = [
    {
      id: "TL001",
      location: "Main Warehouse",
      zone: "Zone A",
      timestamp: "2024-04-15T08:00:00",
      temperature: 18.5,
      humidity: 45,
      status: "Normal",
      recordedBy: "Automated",
    },
    {
      id: "TL002",
      location: "Main Warehouse",
      zone: "Zone B",
      timestamp: "2024-04-15T08:00:00",
      temperature: 19.2,
      humidity: 47,
      status: "Normal",
      recordedBy: "Automated",
    },
    {
      id: "TL003",
      location: "Cold Storage Facility",
      zone: "Refrigerated Area",
      timestamp: "2024-04-15T08:00:00",
      temperature: 4.1,
      humidity: 35,
      status: "Normal",
      recordedBy: "Automated",
    },
    {
      id: "TL004",
      location: "Cold Storage Facility",
      zone: "Freezer",
      timestamp: "2024-04-15T08:00:00",
      temperature: -18.5,
      humidity: 30,
      status: "Normal",
      recordedBy: "Automated",
    },
    {
      id: "TL005",
      location: "East Wing Storage",
      zone: "Zone A",
      timestamp: "2024-04-15T08:00:00",
      temperature: 22.3,
      humidity: 52,
      status: "Warning",
      recordedBy: "Automated",
    },
    {
      id: "TL006",
      location: "Main Warehouse",
      zone: "Zone C",
      timestamp: "2024-04-15T08:00:00",
      temperature: 17.8,
      humidity: 44,
      status: "Normal",
      recordedBy: "Automated",
    },
    {
      id: "TL007",
      location: "Offsite Storage",
      zone: "Main Area",
      timestamp: "2024-04-15T08:00:00",
      temperature: 21.5,
      humidity: 50,
      status: "Normal",
      recordedBy: "Automated",
    },
  ]

  return (
    <PageLayout
      title="Temperature Logs"
      description="Monitor temperature and humidity conditions across storage locations"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Download className="mr-2 h-4 w-4" /> Export Logs
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Normal Conditions</CardTitle>
              <Thermometer className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">5 Zones</div>
              <p className="text-xs text-green-600">All parameters within range</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Warning Conditions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700">1 Zone</div>
              <p className="text-xs text-amber-600">Parameters approaching limits</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Cold Storage</CardTitle>
              <Thermometer className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">2 Zones</div>
              <p className="text-xs text-blue-600">Refrigerated and freezer areas</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search logs..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="main">Main Warehouse</SelectItem>
                <SelectItem value="cold">Cold Storage Facility</SelectItem>
                <SelectItem value="east">East Wing Storage</SelectItem>
                <SelectItem value="offsite">Offsite Storage</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Locations</TabsTrigger>
            <TabsTrigger value="main">Main Warehouse</TabsTrigger>
            <TabsTrigger value="cold">Cold Storage</TabsTrigger>
            <TabsTrigger value="east">East Wing</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Log ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Zone</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">Temperature (°C)</TableHead>
                      <TableHead className="text-right">Humidity (%)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Recorded By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {temperatureLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.id}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>{log.zone}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="text-right">{log.temperature.toFixed(1)}°C</TableCell>
                        <TableCell className="text-right">{log.humidity}%</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              log.status === "Normal"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : log.status === "Warning"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.recordedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="main" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Main Warehouse temperature logs</div>
            </Card>
          </TabsContent>
          <TabsContent value="cold" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Cold Storage temperature logs</div>
            </Card>
          </TabsContent>
          <TabsContent value="east" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for East Wing temperature logs</div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Temperature Trends</CardTitle>
              <CardDescription>24-hour temperature readings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Temperature Trend Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Humidity Trends</CardTitle>
              <CardDescription>24-hour humidity readings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Humidity Trend Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
