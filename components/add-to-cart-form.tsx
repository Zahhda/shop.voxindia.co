"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { toast } from "@/hooks/use-toast"

interface AddToCartFormProps {
  productId: string
  collectionId: string
  colorName: string
  price: number
  productName: string
  area?: number
  lineType: string
  colorSlug: string
  mode: "panel" | "box"
  onOpenCart: () => void
  productImage?: string // Add this prop to receive the product image
}

export default function AddToCartForm({
  productId,
  collectionId,
  colorName,
  price,
  productName,
  area = 0,
  lineType,
  colorSlug,
  mode,
  onOpenCart,
  productImage, // Add this parameter
}: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate the image URL based on the product structure
    const imageUrl = productImage || `/images/${lineType}/${lineType}-${colorSlug}.jpg`

    addToCart({
      productId,
      productName,
      collectionId,
      colorName,
      price,
      quantity,
      image: imageUrl, // Include the image URL
      area,
      mode,
    })

    toast({
      title: "Added to cart",
      description: `${quantity}x ${productName} (${colorName}) added to cart`,
    })

    onOpenCart()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <Label htmlFor="quantity" className="text-sm font-medium">
          Quantity:
        </Label>
        <div className="flex items-center border rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-20 text-center border-0 focus-visible:ring-0"
            min="1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-none"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
      {area > 0 && (
        <div className="text-sm text-muted-foreground pt-2">
          Total Sq.ft: <strong>{(area * quantity).toFixed(2)}</strong>
        </div>
      )}
    </form>
  )
}
