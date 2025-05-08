"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProducts, type Product } from "@/lib/data-access"

// Material UI Icons
import AddIcon from "@mui/icons-material/Add"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import InventoryIcon from "@mui/icons-material/Inventory"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import ScienceIcon from "@mui/icons-material/Science"
import BiotechIcon from "@mui/icons-material/Biotech"
import WarningIcon from "@mui/icons-material/Warning"
import MoreVertIcon from "@mui/icons-material/MoreVert"

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error loading products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "equipment":
        return <MedicalServicesIcon className="text-blue-600" />
      case "reagents":
        return <ScienceIcon className="text-purple-600" />
      case "consumables":
        return <BiotechIcon className="text-green-600" />
      default:
        return <InventoryIcon className="text-gray-600" />
    }
  }

  return (
    <PageLayout
      title="Medical Inventory"
      description="Manage your medical supplies, equipment, and consumables"
      headerAction={
        <Button className="bg-[#500001] hover:bg-[#700001]">
          <AddIcon fontSize="small" className="mr-1" /> Add Product
        </Button>
      }
    >
      <div className="p-6">
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products by name, category, or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-1">
            <FilterListIcon fontSize="small" /> Filters
          </Button>
        </div>

        {/* Inventory stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Products", value: products.length, icon: <InventoryIcon /> },
            {
              label: "Low Stock Items",
              value: products.filter((p) => p.quantity < p.min_quantity).length,
              icon: <WarningIcon />,
            },
            {
              label: "Categories",
              value: [...new Set(products.map((p) => p.category))].length,
              icon: <FilterListIcon />,
            },
            {
              label: "Total Quantity",
              value: products.reduce((sum, p) => sum + p.quantity, 0),
              icon: <MedicalServicesIcon />,
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 border border-gray-200 medical-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
                <div className="text-[#500001]">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Products table */}
        <div className="border border-gray-200 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      Loading inventory...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No products found. Add some products to your inventory.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
                            {getCategoryIcon(product.category)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.quantity}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{product.location}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.quantity <= product.min_quantity
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.quantity <= product.min_quantity ? "Low Stock" : "In Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          <MoreVertIcon fontSize="small" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
