import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getProducts, createProduct } from "@/lib/db"
import { createAuditLog } from "@/lib/db"
import { z } from "zod"

// Input validation schema
const productSchema = z.object({
  name: z.string().min(3).max(100),
  slug: z.string().min(3).max(100),
  description: z.string().min(10),
  longDescription: z.string().optional(),
  price: z.number().positive(),
  sku: z.string().min(2).max(20),
  variantId: z.string(),
  colorId: z.string(),
  dimensions: z.object({
    width: z.string(),
    height: z.string(),
    thickness: z.string(),
  }),
  features: z.array(z.string()),
  images: z.array(z.string()),
})

export async function GET(request: Request) {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error in GET /api/products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = productSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid product data", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    // Create product
    const product = await createProduct(validationResult.data)

    if (!product) {
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    // Log the action
    await createAuditLog({
      userId: token.id as string,
      action: "create",
      entityType: "product",
      entityId: product.id,
      details: { product },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/products:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
