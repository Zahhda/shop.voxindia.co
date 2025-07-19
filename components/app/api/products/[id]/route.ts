import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getProductById, updateProduct, deleteProduct } from "@/lib/db"
import { createAuditLog } from "@/lib/db"
import { z } from "zod"

// Input validation schema
const productUpdateSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  slug: z.string().min(3).max(100).optional(),
  description: z.string().min(10).optional(),
  longDescription: z.string().optional(),
  price: z.number().positive().optional(),
  sku: z.string().min(2).max(20).optional(),
  variantId: z.string().optional(),
  colorId: z.string().optional(),
  dimensions: z
    .object({
      width: z.string(),
      height: z.string(),
      thickness: z.string(),
    })
    .optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error(`Error in GET /api/products/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if product exists
    const existingProduct = await getProductById(params.id)

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = productUpdateSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid product data", details: validationResult.error.format() },
        { status: 400 },
      )
    }

    // Update product
    const updatedProduct = await updateProduct(params.id, validationResult.data)

    if (!updatedProduct) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    // Log the action
    await createAuditLog({
      userId: token.id as string,
      action: "update",
      entityType: "product",
      entityId: params.id,
      details: {
        before: existingProduct,
        after: updatedProduct,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error(`Error in PATCH /api/products/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Verify admin authentication
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    })

    if (!token || token.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if product exists
    const existingProduct = await getProductById(params.id)

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Delete product
    const success = await deleteProduct(params.id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    // Log the action
    await createAuditLog({
      userId: token.id as string,
      action: "delete",
      entityType: "product",
      entityId: params.id,
      details: { product: existingProduct },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/products/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
