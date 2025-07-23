// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  longDescription?: string
  price: number
  sku: string
  variantId: string
  colorId: string
  dimensions: {
    width: string
    height: string
    thickness: string
  }
  features: string[]
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Variant {
  id: string
  name: string
  slug: string
  description: string
  dimensions: {
    width: string
    height: string
    thickness: string
  }
  features: string[]
}

export interface Color {
  id: string
  name: string
  slug: string
  hex: string
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  name: string
  variant: string
  color: string
}

export interface Address {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

// Audit Log Type
export interface AuditLog {
  id: string
  userId: string
  action: string
  entityType: string
  entityId: string
  details: Record<string, any>
  createdAt: Date
}
