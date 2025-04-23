import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, TestTube, Stethoscope, Scissors, FlaskRoundIcon as Flask } from "lucide-react"

export default function CategoriesPage() {
  // Sample categories data
  const categories = [
    {
      id: "CAT001",
      name: "Consumables",
      description: "Disposable medical supplies used in patient care",
      products: 245,
      icon: <TestTube className="h-8 w-8 text-brand-600" />,
      color: "bg-brand-50",
    },
    {
      id: "CAT002",
      name: "Equipment",
      description: "Durable medical devices and machinery",
      products: 78,
      icon: <Stethoscope className="h-8 w-8 text-green-600" />,
      color: "bg-green-50",
    },
    {
      id: "CAT003",
      name: "Instruments",
      description: "Surgical and examination instruments",
      products: 124,
      icon: <Scissors className="h-8 w-8 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      id: "CAT004",
      name: "Reagents",
      description: "Laboratory chemicals and testing reagents",
      products: 96,
      icon: <Flask className="h-8 w-8 text-amber-600" />,
      color: "bg-amber-50",
    },
  ]

  return (
    <PageLayout
      title="Product Categories"
      description="Manage and organize product categories"
      headerAction={
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search categories..." className="pl-9" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full ${category.color} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{category.products} products</span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Consumables</h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Gloves & PPE</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Syringes & Needles</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Bandages & Dressings</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">IV Supplies</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Surgical Supplies</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Equipment</h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Diagnostic Equipment</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Monitoring Devices</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Surgical Equipment</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Laboratory Equipment</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Instruments</h3>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Surgical Instruments</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Examination Tools</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Dental Instruments</li>
                  <li className="text-sm text-gray-600 hover:text-brand-600 cursor-pointer">Specialty Instruments</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
