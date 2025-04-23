"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  sku: string
  stock: number
  unit: string
}

interface AddStockAlertModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddStockAlertModal({ isOpen, onClose }: AddStockAlertModalProps) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const [formData, setFormData] = useState({
    product_id: "",
    current_stock: 0,
    min_threshold: 0,
    alert_type: "Low Stock",
    status: "Active",
    notes: "",
  })

  // Fetch products when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProducts()
    }
  }, [isOpen])

  const fetchProducts = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("products").select("id, name, sku, stock, unit").order("name")
      if (data) setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "product_id") {
      const product = products.find((p) => p.id.toString() === value)
      if (product) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          current_stock: product.stock,
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Convert numeric fields
      const dataToSubmit = {
        ...formData,
        product_id: Number(formData.product_id),
        current_stock: Number(formData.current_stock),
        min_threshold: Number(formData.min_threshold),
      }

      // This would require a 'stock_alerts' table in your database
      // For now, we'll just close the modal

      onClose()
      // You could add a toast notification here
    } catch (error) {
      console.error("Error adding stock alert:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIModal title="Add Stock Alert" description="Create a new stock level alert" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="product_id">Product</Label>
            <Select value={formData.product_id} onValueChange={(value) => handleSelectChange("product_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id.toString()}>
                    {product.name} ({product.sku}) - Current: {product.stock} {product.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_stock">Current Stock</Label>
            <Input
              id="current_stock"
              name="current_stock"
              type="number"
              value={formData.current_stock}
              onChange={handleChange}
              required
              readOnly
            />
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

          <div className="space-y-2">
            <Label htmlFor="alert_type">Alert Type</Label>
            <Select value={formData.alert_type} onValueChange={(value) => handleSelectChange("alert_type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select alert type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Ignored">Ignored</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Input
              id="notes"
              name="notes"
              placeholder="Additional information about this alert"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Stock Alert"}
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
