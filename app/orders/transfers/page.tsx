import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddTransferButton } from "@/components/add-transfer-button"

export default function TransfersPage() {
  // Sample transfers data
  const transfers = [
    {
      id: "TR001",
      source: "Warehouse A",
      destination: "Warehouse B",
      date: "2024-04-05",
      items: 12,
      status: "Completed",
      requestedBy: "John Doe",
    },
    {
      id: "TR002",
      source: "Warehouse B",
      destination: "Warehouse C",
      date: "2024-04-08",
      items: 8,
      status: "In Transit",
      requestedBy: "Sarah Johnson",
    },
    {
      id: "TR003",
      source: "Warehouse A",
      destination: "Warehouse C",
      date: "2024-04-10",
      items: 5,
      status: "Pending",
      requestedBy: "Michael Brown",
    },
    {
      id: "TR004",
      source: "Warehouse C",
      destination: "Warehouse A",
      date: "2024-04-12",
      items: 7,
      status: "Completed",
      requestedBy: "Emily Davis",
    },
    {
      id: "TR005",
      source: "Warehouse B",
      destination: "Warehouse A",
      date: "2024-04-15",
      items: 14,
      status: "In Transit",
      requestedBy: "Robert Wilson",
    },
  ]

  return (
    <PageLayout
      title="Transfers"
      description="Manage inventory transfers between locations"
      headerAction={<AddTransferButton />}
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search transfers..." className="pl-9" />
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
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer ID</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell className="font-medium">{transfer.id}</TableCell>
                        <TableCell>{transfer.source}</TableCell>
                        <TableCell>{transfer.destination}</TableCell>
                        <TableCell>{new Date(transfer.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transfer.items}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transfer.status === "Completed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : transfer.status === "In Transit"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {transfer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transfer.requestedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Pending transfers</div>
            </Card>
          </TabsContent>
          <TabsContent value="in-transit" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for In Transit transfers</div>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Completed transfers</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
