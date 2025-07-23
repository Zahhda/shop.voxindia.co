// import { createClient } from "@supabase/supabase-js"
// import type { Product, Variant, Color, User, Order, AuditLog } from "./types"

// // Initialize Supabase client
// // In a real application, these would be environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// const supabase = createClient(supabaseUrl, supabaseKey)

// // Products
// export async function getProducts(): Promise<Product[]> {
//   const { data, error } = await supabase.from("products").select("*")

//   if (error) {
//     console.error("Error fetching products:", error)
//     return []
//   }

//   return data as Product[]
// }

// export async function getProductById(id: string): Promise<Product | null> {
//   const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

//   if (error) {
//     console.error(`Error fetching product ${id}:`, error)
//     return null
//   }

//   return data as Product
// }

// export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product | null> {
//   const { data, error } = await supabase
//     .from("products")
//     .insert([
//       {
//         ...product,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ])
//     .select()
//     .single()

//   if (error) {
//     console.error("Error creating product:", error)
//     return null
//   }

//   return data as Product
// }

// export async function updateProduct(id: string, product: Partial<Product>): Promise<Product | null> {
//   const { data, error } = await supabase
//     .from("products")
//     .update({
//       ...product,
//       updatedAt: new Date(),
//     })
//     .eq("id", id)
//     .select()
//     .single()

//   if (error) {
//     console.error(`Error updating product ${id}:`, error)
//     return null
//   }

//   return data as Product
// }

// export async function deleteProduct(id: string): Promise<boolean> {
//   const { error } = await supabase.from("products").delete().eq("id", id)

//   if (error) {
//     console.error(`Error deleting product ${id}:`, error)
//     return false
//   }

//   return true
// }

// // Variants
// export async function getVariants(): Promise<Variant[]> {
//   const { data, error } = await supabase.from("variants").select("*")

//   if (error) {
//     console.error("Error fetching variants:", error)
//     return []
//   }

//   return data as Variant[]
// }

// // Colors
// export async function getColors(): Promise<Color[]> {
//   const { data, error } = await supabase.from("colors").select("*")

//   if (error) {
//     console.error("Error fetching colors:", error)
//     return []
//   }

//   return data as Color[]
// }

// // Users
// export async function getUserById(id: string): Promise<User | null> {
//   const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

//   if (error) {
//     console.error(`Error fetching user ${id}:`, error)
//     return null
//   }

//   return data as User
// }

// // Orders
// export async function getOrders(): Promise<Order[]> {
//   const { data, error } = await supabase.from("orders").select("*")

//   if (error) {
//     console.error("Error fetching orders:", error)
//     return []
//   }

//   return data as Order[]
// }

// export async function getOrderById(id: string): Promise<Order | null> {
//   const { data, error } = await supabase.from("orders").select("*, items:order_items(*)").eq("id", id).single()

//   if (error) {
//     console.error(`Error fetching order ${id}:`, error)
//     return null
//   }

//   return data as Order
// }

// // Audit Logs
// export async function createAuditLog(log: Omit<AuditLog, "id" | "createdAt">): Promise<AuditLog | null> {
//   const { data, error } = await supabase
//     .from("audit_logs")
//     .insert([
//       {
//         ...log,
//         createdAt: new Date(),
//       },
//     ])
//     .select()
//     .single()

//   if (error) {
//     console.error("Error creating audit log:", error)
//     return null
//   }

//   return data as AuditLog
// }

// export async function getAuditLogs(): Promise<AuditLog[]> {
//   const { data, error } = await supabase.from("audit_logs").select("*").order("createdAt", { ascending: false })

//   if (error) {
//     console.error("Error fetching audit logs:", error)
//     return []
//   }

//   return data as AuditLog[]
// }
