"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SimpleModal } from "@/components/simple-modal"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase"

export function AddProductButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Consumables",
    sku: "",
    stock: 0,
    unit: "pcs",
    location: "",
    status: "In Stock",
    expiry: "",
    min_threshold: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Convert numeric fields
      const dataToSubmit = {
        ...formData,
        stock: Number(formData.stock),
        min_threshold: Number(formData.min_threshold),
      }

      const { error } = await supabase.from("products").insert(dataToSubmit)

      if (error) throw error

      setIsModalOpen(false)
      // You could add a toast notification here

      // Reset form
      setFormData({
        name: "",
        category: "Consumables",
        sku: "",
        stock: 0,
        unit: "pcs",
        location: "",
        status: "In Stock",
        expiry: "",
        min_threshold: 0,
      })

      // Refresh data
      window.location.reload()
    } catch (error) {
      console.error("Error adding product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Product
      </Button>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Surgical Gloves (Medium)"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Consumables">Consumables</SelectItem>
                  <SelectItem value="Equipment">Equipment</SelectItem>
                  <SelectItem value="Instruments">Instruments</SelectItem>
                  <SelectItem value="Reagents">Reagents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" placeholder="SG-M-001" value={formData.sku} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="1000"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="pairs">pairs</SelectItem>
                    <SelectItem value="boxes">boxes</SelectItem>
                    <SelectItem value="kits">kits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Main Warehouse"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" name="expiry" type="date" value={formData.expiry} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="min_threshold">Minimum Threshold</Label>
              <Input
                id="min_threshold"
                name="min_threshold"
                type="number"
                placeholder="100"
                value={formData.min_threshold}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  )
}
