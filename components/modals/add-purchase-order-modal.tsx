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

interface Supplier {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  sku: string
}

interface OrderItem {
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
  total_price: number
}

interface AddPurchaseOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPurchaseOrderModal({ isOpen, onClose }: AddPurchaseOrderModalProps) {
  const [loading, setLoading] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  const [formData, setFormData] = useState({
    order_number: "",
    supplier_id: "",
    order_date: new Date().toISOString().split("T")[0],
    expected_delivery: "",
    status: "Pending",
    total_amount: 0,
    payment_status: "Unpaid",
  })

  // Fetch suppliers and products when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchSuppliers()
      fetchProducts()

      // Generate a new order number
      const orderNumber = `PO${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`
      setFormData((prev) => ({ ...prev, order_number: orderNumber }))
    }
  }, [isOpen])

  const fetchSuppliers = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("suppliers").select("id, name").order("name")
      if (data) setSuppliers(data)
    } catch (error) {
      console.error("Error fetching suppliers:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const supabase = getSupabaseClient()
      const { data } = await supabase.from("products").select("id, name, sku").order("name")
      if (data) setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addOrderItem = () => {
    if (products.length === 0) return

    const newItem: OrderItem = {
      product_id: products[0].id,
      product_name: products[0].name,
      quantity: 1,
      unit_price: 0,
      total_price: 0,
    }

    setOrderItems((prev) => [...prev, newItem])
  }

  const removeOrderItem = (index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index))
    updateTotalAmount()
  }

  const updateOrderItem = (index: number, field: keyof OrderItem, value: any) => {
    setOrderItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }

      // Recalculate total price if quantity or unit price changes
      if (field === "quantity" || field === "unit_price") {
        const quantity = field === "quantity" ? value : updated[index].quantity
        const unitPrice = field === "unit_price" ? value : updated[index].unit_price
        updated[index].total_price = quantity * unitPrice
      }

      return updated
    })

    updateTotalAmount()
  }

  const updateTotalAmount = () => {
    const total = orderItems.reduce((sum, item) => sum + item.total_price, 0)
    setFormData((prev) => ({ ...prev, total_amount: total }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Convert numeric fields
      const orderDataForInsert = {
        ...formData,
        supplier_id: Number(formData.supplier_id),
        total_amount: Number(formData.total_amount),
      }

      // Insert purchase order
      const { data: orderInsertData, error: orderError } = await supabase
        .from("purchase_orders")
        .insert(orderDataForInsert)
        .select()

      if (orderError) throw orderError

      if (orderInsertData && orderInsertData.length > 0) {
        const orderId = orderInsertData[0].id

        // Insert order items
        const orderItemsData = orderItems.map((item) => ({
          purchase_order_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
        }))

        const { error: itemsError } = await supabase.from("purchase_order_items").insert(orderItemsData)

        if (itemsError) throw itemsError
      }

      onClose()
      // You could add a toast notification here
    } catch (error) {
      console.error("Error adding purchase order:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIModal
      title="Create Purchase Order"
      description="Create a new purchase order for supplies"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="order_number">Order Number</Label>
            <Input
              id="order_number"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
              required
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier_id">Supplier</Label>
            <Select value={formData.supplier_id} onValueChange={(value) => handleSelectChange("supplier_id", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Label htmlFor="expected_delivery">Expected Delivery</Label>
            <Input
              id="expected_delivery"
              name="expected_delivery"
              type="date"
              value={formData.expected_delivery}
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
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment_status">Payment Status</Label>
            <Select
              value={formData.payment_status}
              onValueChange={(value) => handleSelectChange("payment_status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unpaid">Unpaid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Order Items</h3>
            <Button type="button" variant="outline" size="sm" onClick={addOrderItem}>
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          {orderItems.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No items added. Click "Add Item" to add products to this order.
            </div>
          ) : (
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end border p-3 rounded-md">
                  <div className="col-span-4 space-y-2">
                    <Label>Product</Label>
                    <Select
                      value={item.product_id.toString()}
                      onValueChange={(value) => {
                        const product = products.find((p) => p.id.toString() === value)
                        updateOrderItem(index, "product_id", Number(value))
                        if (product) {
                          updateOrderItem(index, "product_name", product.name)
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

                  <div className="col-span-2 space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateOrderItem(index, "quantity", Number(e.target.value))}
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Unit Price</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unit_price}
                      onChange={(e) => updateOrderItem(index, "unit_price", Number(e.target.value))}
                    />
                  </div>

                  <div className="col-span-3 space-y-2">
                    <Label>Total Price</Label>
                    <Input type="number" value={item.total_price.toFixed(2)} readOnly />
                  </div>

                  <div className="col-span-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeOrderItem(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="flex justify-end items-center pt-4 border-t">
                <div className="font-medium mr-4">Total Amount:</div>
                <div className="text-lg font-bold">${formData.total_amount.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || orderItems.length === 0}>
            {loading ? "Creating..." : "Create Purchase Order"}
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
