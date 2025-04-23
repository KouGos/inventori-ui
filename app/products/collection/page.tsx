import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus, Grid, List } from "lucide-react"

export default function CollectionPage() {
  // Sample product collections
  const collections = [
    {
      id: "COL001",
      name: "Surgical Supplies",
      description: "Essential surgical tools and consumables",
      products: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "COL002",
      name: "Diagnostic Equipment",
      description: "Tools for patient diagnosis and monitoring",
      products: 32,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "COL003",
      name: "Laboratory Reagents",
      description: "Chemical reagents for lab testing",
      products: 28,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "COL004",
      name: "Protective Gear",
      description: "Personal protective equipment for staff",
      products: 18,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "COL005",
      name: "Sterilization Products",
      description: "Tools and consumables for sterilization",
      products: 15,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "COL006",
      name: "Emergency Supplies",
      description: "Critical supplies for emergency response",
      products: 24,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <PageLayout
      title="Product Collections"
      description="Organize and manage your product collections"
      headerAction={
        <Button className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
          <Plus className="mr-2 h-4 w-4" /> New Collection
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search collections..." className="pl-9" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <div className="border rounded-md flex">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-l-md">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-r-md bg-gray-100">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Collections</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <Card key={collection.id} className="overflow-hidden">
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="h-40 w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{collection.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{collection.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">{collection.products} products</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Active collections</div>
            </Card>
          </TabsContent>
          <TabsContent value="archived" className="mt-4">
            <Card>
              <div className="p-6 text-center text-gray-500">Filtered view for Archived collections</div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
