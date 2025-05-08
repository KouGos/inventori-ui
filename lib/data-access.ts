import { supabase } from "./supabase"

// Types
export type Product = {
  id: string
  name: string
  category: string
  sku: string
  description: string
  quantity: number
  min_quantity: number
  expiry_date?: string
  location: string
  supplier_id: string
  created_at: string
}

export type Supplier = {
  id: string
  name: string
  contact_name: string
  email: string
  phone: string
  address: string
  created_at: string
}

export type Warehouse = {
  id: string
  name: string
  location: string
  manager: string
  capacity: number
  created_at: string
}

export type StockAlert = {
  id: string
  product_id: string
  threshold: number
  status: "active" | "resolved"
  created_at: string
}

export type Transfer = {
  id: string
  product_id: string
  source_location: string
  destination_location: string
  quantity: number
  status: "pending" | "in_transit" | "completed"
  created_at: string
}

export type PurchaseOrder = {
  id: string
  supplier_id: string
  status: "draft" | "submitted" | "approved" | "received"
  total_amount: number
  created_at: string
}

// Products
export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) throw error
  return data as Product
}

export async function createProduct(product: Omit<Product, "id" | "created_at">) {
  const { data, error } = await supabase.from("products").insert([product]).select()

  if (error) throw error
  return data[0] as Product
}

// Suppliers
export async function getSuppliers() {
  const { data, error } = await supabase.from("suppliers").select("*").order("name")

  if (error) throw error
  return data as Supplier[]
}

export async function createSupplier(supplier: Omit<Supplier, "id" | "created_at">) {
  const { data, error } = await supabase.from("suppliers").insert([supplier]).select()

  if (error) throw error
  return data[0] as Supplier
}

// Warehouses
export async function getWarehouses() {
  const { data, error } = await supabase.from("warehouses").select("*").order("name")

  if (error) throw error
  return data as Warehouse[]
}

export async function createWarehouse(warehouse: Omit<Warehouse, "id" | "created_at">) {
  const { data, error } = await supabase.from("warehouses").insert([warehouse]).select()

  if (error) throw error
  return data[0] as Warehouse
}

// Stock Alerts
export async function getStockAlerts() {
  const { data, error } = await supabase
    .from("stock_alerts")
    .select("*, products(*)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createStockAlert(alert: Omit<StockAlert, "id" | "created_at">) {
  const { data, error } = await supabase.from("stock_alerts").insert([alert]).select()

  if (error) throw error
  return data[0] as StockAlert
}

// Transfers
export async function getTransfers() {
  const { data, error } = await supabase
    .from("transfers")
    .select("*, products(*)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createTransfer(transfer: Omit<Transfer, "id" | "created_at">) {
  const { data, error } = await supabase.from("transfers").insert([transfer]).select()

  if (error) throw error
  return data[0] as Transfer
}

// Purchase Orders
export async function getPurchaseOrders() {
  const { data, error } = await supabase
    .from("purchase_orders")
    .select("*, suppliers(*)")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createPurchaseOrder(order: Omit<PurchaseOrder, "id" | "created_at">) {
  const { data, error } = await supabase.from("purchase_orders").insert([order]).select()

  if (error) throw error
  return data[0] as PurchaseOrder
}
