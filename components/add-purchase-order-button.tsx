"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { SimpleModal } from "@/components/simple-modal"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseClient } from "@/lib/supabase"

export function AddPurchaseOrderButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    supplier_id: "",
    order_date: new Date().toISOString().split("T")[0],
    status: "Pending",
    total_amount: 0,
    items: [{ product_name: "", quantity: 1, unit_price: 0 }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...formData.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    // Calculate total amount
    const totalAmount = updatedItems.reduce((sum, item) => {
      return sum + Number(item.quantity) * Number(item.unit_price)
    }, 0)

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total_amount: totalAmount,
    }))
  }

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { product_name: "", quantity: 1, unit_price: 0 }],
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return

    const updatedItems = formData.items.filter((_, i) => i !== index)

    // Recalculate total amount
    const totalAmount = updatedItems.reduce((sum, item) => {
      return sum + Number(item.quantity) * Number(item.unit_price)
    }, 0)

    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
      total_amount: totalAmount,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Create purchase order
      const { data: orderData, error: orderError } = await supabase
        .from("purchase_orders")
        .insert({
          supplier_id: formData.supplier_id,
          order_date: formData.order_date,
          status: formData.status,
          total_amount: formData.total_amount,
        })
        .select()

      if (orderError) throw orderError

      // Create order items (in a real app, you'd want to handle this in a transaction)
      if (orderData && orderData.length > 0) {
        const orderId = orderData[0].id

        // Insert order items
        for (const item of formData.items) {
          const { error: itemError } = await supabase.from("order_items").insert({
            order_id: orderId,
            product_name: item.product_name,
            quantity: Number(item.quantity),
            unit_price: Number(item.unit_price),
          })

          if (itemError) throw itemError
        }
      }

      setIsModalOpen(false)
      // You could add a toast notification here

      // Reset form
      setFormData({
        supplier_id: "",
        order_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        total_amount: 0,
        items: [{ product_name: "", quantity: 1, unit_price: 0 }],
      })

      // Refresh data
      window.location.reload()
    } catch (error) {
      console.error("Error adding purchase order:", error)
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
        <Plus className="mr-2 h-4 w-4" /> Create Order
      </Button>

      <SimpleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Purchase Order">
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier_id">Supplier</Label>
              <Input
                id="supplier_id"
                name="supplier_id"
                placeholder="Supplier ID"
                value={formData.supplier_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_date">Order Date</Label>
              <Input
                id="order_date"
                name="order_date"
                type="date"
                value={formData.order_date}
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
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_amount">Total Amount</Label>
              <Input
                id="total_amount"
                name="total_amount"
                type="number"
                value={formData.total_amount}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Order Items</h3>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-end">
                <div className="col-span-5">
                  <Label htmlFor={`item-${index}-name`} className="text-xs">
                    Product
                  </Label>
                  <Input
                    id={`item-${index}-name`}
                    value={item.product_name}
                    onChange={(e) => handleItemChange(index, "product_name", e.target.value)}
                    placeholder="Product name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`item-${index}-quantity`} className="text-xs">
                    Quantity
                  </Label>
                  <Input
                    id={`item-${index}-quantity`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-3">
                  <Label htmlFor={`item-${index}-price`} className="text-xs">
                    Unit Price
                  </Label>
                  <Input
                    id={`item-${index}-price`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) => handleItemChange(index, "unit_price", Number(e.target.value))}
                    required
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Purchase Order"}
            </Button>
          </div>
        </form>
      </SimpleModal>
    </>
  )
}
