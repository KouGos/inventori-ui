import { getSupabaseClient, createServerSupabaseClient } from "./supabase"

// Products
export async function getProducts() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("products").select("*").order("name")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

export async function getProductsByCategory(category: string) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("products").select("*").eq("category", category).order("name")

  if (error) {
    console.error(`Error fetching ${category} products:`, error)
    return []
  }

  return data
}

// Stock Alerts
export async function getStockAlerts() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("stock_alerts").select("*")

  if (error) {
    console.error("Error fetching stock alerts:", error)
    return []
  }

  return data
}

// Suppliers
export async function getSuppliers() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("suppliers").select("*").order("name")

  if (error) {
    console.error("Error fetching suppliers:", error)
    return []
  }

  return data
}

// Warehouses
export async function getWarehouses() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.from("warehouses").select("*").order("name")

  if (error) {
    console.error("Error fetching warehouses:", error)
    return []
  }

  return data
}

// Purchase Orders
export async function getPurchaseOrders() {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("purchase_orders")
    .select(`
      *,
      suppliers:supplier_id (name)
    `)
    .order("order_date", { ascending: false })

  if (error) {
    console.error("Error fetching purchase orders:", error)
    return []
  }

  // Format the data to match our frontend expectations
  return data.map((order) => ({
    id: order.id,
    order_number: order.order_number,
    supplier: order.suppliers?.name || "Unknown Supplier",
    date: order.order_date,
    total: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(order.total_amount),
    status: order.status,
    items_count: 0, // We'll need a separate query to get this
    expectedDelivery: order.expected_delivery,
  }))
}

// Server-side functions (for use in Server Components)
export async function getProductsServer() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("products").select("*").order("name")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

export async function getWarehousesServer() {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase.from("warehouses").select("*").order("name")

  if (error) {
    console.error("Error fetching warehouses:", error)
    return []
  }

  return data
}
