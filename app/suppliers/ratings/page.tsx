import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Star, StarHalf } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SuppliersRatingsPage() {
  // Sample suppliers ratings data
  const suppliersRatings = [
    {
      id: "SUP001",
      name: "MedSupply Inc.",
      contact: "John Smith",
      category: "Consumables",
      overallRating: 4.8,
      qualityRating: 5.0,
      deliveryRating: 4.5,
      priceRating: 4.2,
      serviceRating: 4.7,
      reviewCount: 24,
    },
    {
      id: "SUP002",
      name: "LabEquip Co.",
      contact: "Sarah Johnson",
      category: "Equipment",
      overallRating: 4.2,
      qualityRating: 4.5,
      deliveryRating: 4.0,
      priceRating: 3.8,
      serviceRating: 4.3,
      reviewCount: 18,
    },
    {
      id: "SUP003",
      name: "SurgicalTools Ltd.",
      contact: "Michael Brown",
      category: "Instruments",
      overallRating: 3.9,
      qualityRating: 4.2,
      deliveryRating: 3.5,
      priceRating: 3.7,
      serviceRating: 4.0,
      reviewCount: 15,
    },
    {
      id: "SUP004",
      name: "PharmaChem Co.",
      contact: "Emily Davis",
      category: "Reagents",
      overallRating: 4.5,
      qualityRating: 4.7,
      deliveryRating: 4.3,
      priceRating: 4.0,
      serviceRating: 4.6,
      reviewCount: 20,
    },
    {
      id: "SUP005",
      name: "DiagnosticSys Inc.",
      contact: "Robert Wilson",
      category: "Equipment",
      overallRating: 3.6,
      qualityRating: 4.0,
      deliveryRating: 3.2,
      priceRating: 3.5,
      serviceRating: 3.8,
      reviewCount: 12,
    },
    {
      id: "SUP006",
      name: "MedTech Solutions",
      contact: "Jennifer Lee",
      category: "Consumables",
      overallRating: 4.7,
      qualityRating: 4.8,
      deliveryRating: 4.6,
      priceRating: 4.3,
      serviceRating: 4.9,
      reviewCount: 22,
    },
  ]

  // Function to render rating stars
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + Math.ceil(rating)} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-2 text-sm">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <PageLayout title="Supplier Ratings" description="Evaluate and track supplier performance">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search suppliers..." className="pl-9" />
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
            <TabsTrigger value="all">All Suppliers</TabsTrigger>
            <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
            <TabsTrigger value="needs-improvement">Needs Improvement</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Performance Ratings</CardTitle>
                <CardDescription>Ratings based on quality, delivery, price, and service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Overall Rating</TableHead>
                        <TableHead>Quality</TableHead>
                        <TableHead>Delivery</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-right">Reviews</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliersRatings.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div>{supplier.name}</div>
                            <div className="text-sm text-gray-500">{supplier.contact}</div>
                          </TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>{renderRating(supplier.overallRating)}</TableCell>
                          <TableCell>{renderRating(supplier.qualityRating)}</TableCell>
                          <TableCell>{renderRating(supplier.deliveryRating)}</TableCell>
                          <TableCell>{renderRating(supplier.priceRating)}</TableCell>
                          <TableCell>{renderRating(supplier.serviceRating)}</TableCell>
                          <TableCell className="text-right">{supplier.reviewCount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="top-rated" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Top Rated suppliers (4.5+ rating)</div>
            </Card>
          </TabsContent>
          <TabsContent value="needs-improvement" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">
                Filtered view for suppliers that need improvement (below 4.0 rating)
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rating Trends</CardTitle>
              <CardDescription>Supplier rating changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <Star className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Rating Trends Chart</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Distribution of ratings across suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <Star className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Rating Distribution Chart</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
