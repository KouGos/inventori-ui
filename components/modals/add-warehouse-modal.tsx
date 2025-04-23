"use client"

import type React from "react"

import { useState } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase"

interface AddWarehouseModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddWarehouseModal({ isOpen, onClose }: AddWarehouseModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    manager: "",
    capacity: "0%",
    temperature: "20°C",
    status: "Active",
    products_count: 0,
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
        products_count: Number(formData.products_count),
      }

      const { error } = await supabase.from("warehouses").insert(dataToSubmit)

      if (error) throw error

      onClose()
      // You could add a toast notification here
    } catch (error) {
      console.error("Error adding warehouse:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIModal title="Add New Warehouse" description="Add a new warehouse location" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Warehouse Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Main Warehouse"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="123 Medical Drive, Boston, MA"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager">Manager</Label>
            <Input
              id="manager"
              name="manager"
              placeholder="John Smith"
              value={formData.manager}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              placeholder="85%"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              name="temperature"
              placeholder="18°C"
              value={formData.temperature}
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="products_count">Initial Products Count</Label>
            <Input
              id="products_count"
              name="products_count"
              type="number"
              placeholder="0"
              value={formData.products_count}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Warehouse"}
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
