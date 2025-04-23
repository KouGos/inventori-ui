import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, FileText, AlertTriangle } from "lucide-react"

export default function SuppliersContractsPage() {
  // Sample contracts data
  const contracts = [
    {
      id: "CON001",
      supplier: "MedSupply Inc.",
      type: "Annual Supply",
      startDate: "2024-01-15",
      endDate: "2025-01-14",
      value: "$125,000.00",
      status: "Active",
      daysRemaining: 285,
      renewalOption: "Yes",
    },
    {
      id: "CON002",
      supplier: "LabEquip Co.",
      type: "Equipment Service",
      startDate: "2023-08-10",
      endDate: "2024-08-09",
      value: "$45,000.00",
      status: "Active",
      daysRemaining: 120,
      renewalOption: "Yes",
    },
    {
      id: "CON003",
      supplier: "SurgicalTools Ltd.",
      type: "Quarterly Supply",
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      value: "$28,500.00",
      status: "Active",
      daysRemaining: 80,
      renewalOption: "No",
    },
    {
      id: "CON004",
      supplier: "PharmaChem Co.",
      type: "Annual Supply",
      startDate: "2023-11-15",
      endDate: "2024-05-14",
      value: "$78,000.00",
      status: "Expiring Soon",
      daysRemaining: 30,
      renewalOption: "Yes",
    },
    {
      id: "CON005",
      supplier: "DiagnosticSys Inc.",
      type: "Equipment Lease",
      startDate: "2022-10-01",
      endDate: "2024-09-30",
      value: "$156,000.00",
      status: "Active",
      daysRemaining: 172,
      renewalOption: "Yes",
    },
    {
      id: "CON006",
      supplier: "MedTech Solutions",
      type: "Annual Supply",
      startDate: "2023-06-15",
      endDate: "2024-06-14",
      value: "$92,000.00",
      status: "Expiring Soon",
      daysRemaining: 65,
      renewalOption: "Yes",
    },
    {
      id: "CON007",
      supplier: "Global Medical Inc.",
      type: "Equipment Service",
      startDate: "2023-04-01",
      endDate: "2024-03-31",
      value: "$35,000.00",
      status: "Expired",
      daysRemaining: 0,
      renewalOption: "No",
    },
  ]

  return (
    <PageLayout
      title="Supplier Contracts"
      description="Manage and track supplier agreements and contracts"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> New Contract
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search contracts..." className="pl-9" />
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

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center">
              <div className="mr-4 bg-green-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-green-800">Active Contracts</div>
                <div className="text-2xl font-bold text-green-700">5</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-center">
              <div className="mr-4 bg-amber-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-amber-800">Expiring Soon</div>
                <div className="text-2xl font-bold text-amber-700">2</div>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center">
              <div className="mr-4 bg-red-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-red-800">Expired Contracts</div>
                <div className="text-2xl font-bold text-red-700">1</div>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Contracts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Days Remaining</TableHead>
                      <TableHead>Renewal Option</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-medium">{contract.id}</TableCell>
                        <TableCell>{contract.supplier}</TableCell>
                        <TableCell>{contract.type}</TableCell>
                        <TableCell>{new Date(contract.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(contract.endDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{contract.value}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              contract.status === "Active"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : contract.status === "Expiring Soon"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{contract.daysRemaining}</TableCell>
                        <TableCell>{contract.renewalOption}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Active contracts</div>
            </Card>
          </TabsContent>
          <TabsContent value="expiring" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for contracts Expiring Soon</div>
            </Card>
          </TabsContent>
          <TabsContent value="expired" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Expired contracts</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
