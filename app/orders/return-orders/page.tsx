import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus } from "lucide-react"

export default function ReturnOrdersPage() {
  // Sample return orders data
  const returnOrders = [
    {
      id: "RO001",
      supplier: "MedSupply Inc.",
      date: "2024-04-02",
      items: 3,
      reason: "Damaged on arrival",
      status: "Approved",
      value: "$450.00",
    },
    {
      id: "RO002",
      supplier: "LabEquip Co.",
      date: "2024-04-05",
      items: 1,
      reason: "Wrong item shipped",
      status: "Pending",
      value: "$1,250.00",
    },
    {
      id: "RO003",
      supplier: "SurgicalTools Ltd.",
      date: "2024-04-08",
      items: 2,
      reason: "Expired product",
      status: "Completed",
      value: "$320.00",
    },
    {
      id: "RO004",
      supplier: "MedSupply Inc.",
      date: "2024-04-10",
      items: 5,
      reason: "Quality issues",
      status: "Approved",
      value: "$780.00",
    },
    {
      id: "RO005",
      supplier: "PharmaChem Co.",
      date: "2024-04-12",
      items: 4,
      reason: "Damaged on arrival",
      status: "Rejected",
      value: "$560.00",
    },
  ]

  return (
    <PageLayout
      title="Return Orders"
      description="Manage product returns to suppliers"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> New Return
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search returns..." className="pl-9" />
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
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {returnOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.supplier}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              order.status === "Completed"
                                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                : order.status === "Approved"
                                  ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                                  : order.status === "Pending"
                                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
                                    : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{order.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">Filtered view for Pending returns</div>
            </Card>
          </TabsContent>
          <TabsContent value="approved" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">Filtered view for Approved returns</div>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                Filtered view for Completed returns
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="rejected" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">Filtered view for Rejected returns</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
