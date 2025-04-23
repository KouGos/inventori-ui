"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase"
import { Trash, Plus } from "lucide-react"

interface Product {
  id: number
  name: string
  sku: string
}

interface Warehouse {
  id: number
  name: string
}

interface TransferItem {
  product_id: number
  product_name: string
  quantity: number
}

interface AddTransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTransferModal({ isOpen, onClose }: AddTransferModalProps) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [transferItems, setTransferItems] = useState<TransferItem[]>([])

  const [formData, setFormData] = useState({
    transfer_number: "",
    source_location: "",
    destination_location: "",
    transfer_date: new Date().toISOString().split("T")[0],
    items_count: 0,
    status: "Pending",
    requested_by: "",
  })

  // Fetch products and warehouses when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchProducts()
      fetchWarehouses()

      // Generate a new transfer number
      const transferNumber = `TR${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`
      setFormData((prev) => ({ ...prev, transfer_number: transferNumber }))
    }
  }, [isOpen])

  const fetchProducts = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("products").select("id, name, sku").order("name")
      if (data) setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchWarehouses = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("warehouses").select("id, name").order("name")
      if (data) setWarehouses(data)
    } catch (error) {
      console.error("Error fetching warehouses:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addTransferItem = () => {
    if (products.length === 0) return

    const newItem: TransferItem = {
      product_id: products[0].id,
      product_name: products[0].name,
      quantity: 1,
    }

    setTransferItems((prev) => [...prev, newItem])
    updateItemsCount()
  }

  const removeTransferItem = (index: number) => {
    setTransferItems((prev) => prev.filter((_, i) => i !== index))
    updateItemsCount()
  }

  const updateTransferItem = (index: number, field: keyof TransferItem, value: any) => {
    setTransferItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })

    updateItemsCount()
  }

  const updateItemsCount = () => {
    setFormData((prev) => ({ ...prev, items_count: transferItems.length }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Insert transfer
      const { data: transferData, error: transferError } = await supabase.from("transfers").insert(formData).select()

      if (transferError) throw transferError

      if (transferData && transferData.length > 0) {
        const transferId = transferData[0].id

        // Insert transfer items
        const transferItemsData = transferItems.map((item) => ({
          transfer_id: transferId,
          product_id: item.product_id,
          quantity: item.quantity,
        }))

        const { error: itemsError } = await supabase.from("transfer_items").insert(transferItemsData)

        if (itemsError) throw itemsError
      }

      onClose()
      // You could add a toast notification here
    } catch (error) {
      console.error("Error adding transfer:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIModal
      title="Create Transfer"
      description="Create a new inventory transfer between locations"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transfer_number">Transfer Number</Label>
            <Input
              id="transfer_number"
              name="transfer_number"
              value={formData.transfer_number}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requested_by">Requested By</Label>
            <Input
              id="requested_by"
              name="requested_by"
              placeholder="John Smith"
              value={formData.requested_by}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source_location">Source Location</Label>
            <Select
              value={formData.source_location}
              onValueChange={(value) => handleSelectChange("source_location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select source location" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination_location">Destination Location</Label>
            <Select
              value={formData.destination_location}
              onValueChange={(value) => handleSelectChange("destination_location", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination location" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.name}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Transfer Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addTransferItem}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          {transferItems.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No items added. Click "Add Item" to add products to this transfer.
            </div>
          ) : (
            <div className="space-y-4">
              {transferItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
                  <div className="col-span-8 space-y-2">
                    <Label>Product</Label>
                    <Select
                      value={item.product_id.toString()}
                      onValueChange={(value) => {
                        const product = products.find((p) => p.id.toString() === value)
                        updateTransferItem(index, "product_id", Number(value))
                        if (product) {
                          updateTransferItem(index, "product_name", product.name)
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name} ({product.sku})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-3 space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateTransferItem(index, "quantity", Number(e.target.value))}
                    />
                  </div>

                  <div className="col-span-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeTransferItem(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || transferItems.length === 0}>
            {loading ? "Creating..." : "Create Transfer"}
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
