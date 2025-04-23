import PurchaseOrdersClientPage from "@/components/orders/purchase-orders-client-page"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function PurchaseOrdersPage() {
  const supabase = createServerSupabaseClient()
  const { data: purchaseOrders, error } = await supabase.from("purchase_orders").select("*, suppliers(name)")
  if (error) {
    console.error("Error fetching purchase orders:", error)
  }
  return <PurchaseOrdersClientPage purchaseOrders={purchaseOrders || []} />
}
