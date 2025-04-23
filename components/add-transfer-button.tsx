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

export function AddTransferButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    source_warehouse: "",
    destination_warehouse: "",
    transfer_date: new Date().toISOString().split("T")[0],
    status: "Pending",
    product_name: "",
    quantity: 1,
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
        quantity: Number(formData.quantity),
      }

      const { error } = await supabase.from("transfers").insert(dataToSubmit)

      if (error) throw error

      setIsModalOpen(false)
      // You could add a toast notification here

      // Reset form
      setFormData({
        source_warehouse: "",
        destination_warehouse: "",
        transfer_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        product_name: "",
        quantity: 1,
      })

      // Refresh data
      window.location.reload()
    } catch (error) {
      console.error("Error adding transfer:", error)
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
        <Plus className="mr-2 h-4 w-4" /> New Transfer
      </Button>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Transfer">
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source_warehouse">Source Warehouse</Label>
              <Input
                id="source_warehouse"
                name="source_warehouse"
                placeholder="Main Warehouse"
                value={formData.source_warehouse}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination_warehouse">Destination Warehouse</Label>
              <Input
                id="destination_warehouse"
                name="destination_warehouse"
                placeholder="Secondary Warehouse"
                value={formData.destination_warehouse}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transfer_date">Transfer Date</Label>
              <Input
                id="transfer_date"
                name="transfer_date"
                type="date"
                value={formData.transfer_date}
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
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product_name">Product</Label>
              <Input
                id="product_name"
                name="product_name"
                placeholder="Surgical Gloves"
                value={formData.product_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={formData.quantity}
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
              {loading ? "Creating..." : "Create Transfer"}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  )
}
