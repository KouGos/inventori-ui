import { createClient } from "@supabase/supabase-js"

// Types for our database
export type Product = {
  id: string
  name: string
  category: string
  sku: string
  stock: number
  unit: string
  location: string
  status: string
  expiry: string | null
  min_threshold: number
  created_at: string
  updated_at: string
}

export type Supplier = {
  id: string
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  status: string
  rating: number
  created_at: string
  updated_at: string
}

export type Warehouse = {
  id: string
  name: string
  location: string
  manager: string
  capacity: string
  temperature: string
  status: string
  products_count: number
  created_at: string
  updated_at: string
}

export type PurchaseOrder = {
  id: string
  order_number: string
  supplier_id: string
  supplier_name: string
  order_date: string
  expected_delivery: string
  status: string
  total_amount: number
  payment_status: string
  created_at: string
  updated_at: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (already exists)
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// For client-side operations
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient(supabaseUrl, supabaseAnonKey)
}

// For server-side operations that require higher privileges
export const createServiceClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    throw new Error("Missing Supabase service role key")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}
