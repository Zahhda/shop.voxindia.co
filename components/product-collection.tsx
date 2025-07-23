"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useEffect, useRef, useState } from "react"
import RelatedProducts from "./ui/RelatedProduct"

const collections = [
  {
    id: "s-line",
    name: "S-Line",
    description: "Narrow lamellas for a taller, cozier space",
    image: "/s-line/s-line-white-3.webp?height=600&width=800",
    colors: ["White", "Grey", "Anthracite", "Black", "Mocca", "Natural", "Natural Black"],
    dimensions: {
      width: "122 mm",
      height: "3050 mm",
      thickness: "12 mm",
    },
  },
  {
    id: "m-line",
    name: "M-Line",
    description: "Medium-width lamellas with extra depth",
    image: "m-line/m-line-white-3.webp?height=600&width=800",
    colors: ["White", "Grey", "Anthracite", "Black", "Mocca", "Natural", "Natural Black", "Chocolate"],
    dimensions: {
      width: "122 mm",
      height: "3050 mm",
      thickness: "12 mm",
    },
  },
  {
    id: "l-line",
    name: "L-Line",
    description: "Wide lamellas for bold visual impact",
    image: "l-line/l-line-mocca-4.webp?height=600&width=800",
    colors: ["White", "Grey", "Anthracite", "Mocca", "Natural", "Chocolate"],
    dimensions: {
      width: "122 mm",
      height: "3050 mm",
      thickness: "12 mm",
    },
  },
]

const relatedProducts = [
  {
    id: "glue-type-a",
    name: "Glue Type A",
    description: "High-strength adhesive ideal for S/M/L line panel installation.",
    image: "/glue-main.png",
    price: "$299",
  },
  {
    id: "glue-type-b",
    name: "Glue Type B",
    description: "Flexible bonding agent designed for curved or uneven surfaces.",
    image: "/glue-main.png",
    price: "$399",
  },
  {
    id: "GLUE-SKU",
    name: "Soudal Fix All High Tack Glue",
    description: "Professional-grade adhesive for secure panel mounting.",
    image: "/glue-main.png",
    price: "$599",
  },
]


interface Props {
  onOpenCart?: () => void
}

export default function ProductCollection({ onOpenCart }: Props = {}) {
  const { addToCart, cart, updateQuantity, removeItem } = useCart()

  const GLUE_THRESHOLD_SQFT = 30
  const GLUE_PRODUCT_ID = "GLUE-SKU"
  const FREE_GLUE_ID = "FREE-GLUE-SKU"

  // State for quantities of each related product
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>(() => {
    const initialQuantities: Record<string, number> = {}
    relatedProducts.forEach((product) => {
      initialQuantities[product.id] = 1
    })
    return initialQuantities
  })

  // Use refs to track previous values and prevent infinite loops
  const prevTotalSqftRef = useRef(0)
  const prevFreeGlueCountRef = useRef(0)
  const isUpdatingRef = useRef(false)

  // Calculate current total square footage from non-glue items
  const getCurrentTotalSqft = () => {
    return cart
      .filter((item) => !item.isGlue && item.area && item.area > 0)
      .reduce((sum, item) => sum + (item.area || 0) * item.quantity, 0)
  }

  // Calculate how many free glue units user should have
  const getFreeGlueEntitled = () => {
    const totalSqft = getCurrentTotalSqft()
    return Math.floor(totalSqft / GLUE_THRESHOLD_SQFT)
  }

  // Get current free glue quantity in cart
  const getCurrentFreeGlueInCart = () => {
    return cart.find((item) => item.productId === FREE_GLUE_ID && item.isGlue)?.quantity || 0
  }

  // Get current paid glue quantity in cart
  const getCurrentPaidGlueInCart = () => {
    return cart.find((item) => item.productId === GLUE_PRODUCT_ID && !item.isGlue)?.quantity || 0
  }

  // Auto-manage free glue based on cart changes
  useEffect(() => {
    // Prevent infinite loops
    if (isUpdatingRef.current) {
      return
    }

    const currentTotalSqft = getCurrentTotalSqft()
    const freeGlueEntitled = getFreeGlueEntitled()
    const currentFreeGlue = getCurrentFreeGlueInCart()

    // Only proceed if something actually changed
    const sqftChanged = currentTotalSqft !== prevTotalSqftRef.current
    const freeGlueChanged = freeGlueEntitled !== prevFreeGlueCountRef.current

    if (!sqftChanged && !freeGlueChanged) {
      return
    }

    // Update refs
    prevTotalSqftRef.current = currentTotalSqft
    prevFreeGlueCountRef.current = freeGlueEntitled

    // Set updating flag
    isUpdatingRef.current = true

    try {
      if (freeGlueEntitled > 0 && currentFreeGlue === 0) {
        // Add free glue for the first time
        console.log("Adding free glue for first time:", freeGlueEntitled)

        const freeGlueItem = {
          productId: FREE_GLUE_ID,
          productName: "Soudal Fix All High Tack Glue (FREE)",
          collectionId: "related-products",
          colorName: "Default",
          price: 0,
          quantity: freeGlueEntitled,
          image: "/glue-main.png",
          area: 0,
          mode: "panel" as const,
          isGlue: true,
        }

        addToCart(freeGlueItem)

        toast({
          title: "Free glue added! 🎉",
          description: `You qualify for ${freeGlueEntitled} free glue with your ${currentTotalSqft.toFixed(1)} sq ft order`,
        })
      } else if (freeGlueEntitled > currentFreeGlue && currentFreeGlue > 0) {
        // Increase existing free glue quantity
        console.log("Increasing free glue from", currentFreeGlue, "to", freeGlueEntitled)

        updateQuantity(FREE_GLUE_ID, "Default", freeGlueEntitled)

        toast({
          title: "More free glue added! 🎉",
          description: `You now qualify for ${freeGlueEntitled} free glue units with your ${currentTotalSqft.toFixed(1)} sq ft order`,
        })
      } else if (freeGlueEntitled < currentFreeGlue) {
        // Decrease or remove free glue
        if (freeGlueEntitled === 0) {
          console.log("Removing all free glue")
          removeItem(FREE_GLUE_ID, "Default")
        } else {
          console.log("Decreasing free glue from", currentFreeGlue, "to", freeGlueEntitled)
          updateQuantity(FREE_GLUE_ID, "Default", freeGlueEntitled)
        }
      }
    } finally {
      // Reset updating flag after a delay to allow cart to update
      setTimeout(() => {
        isUpdatingRef.current = false
      }, 100)
    }
  }, [cart.length, cart.map((item) => `${item.productId}-${item.quantity}-${item.area}`).join(",")]) // Only depend on cart changes that matter

  // Get display price for a product
  const getDisplayPrice = (product: (typeof relatedProducts)[0]) => {
    if (product.id !== GLUE_PRODUCT_ID) {
      return product.price
    }

    const freeGlueEntitled = getFreeGlueEntitled()
    const currentFreeGlue = getCurrentFreeGlueInCart()

    // Show FREE only if user is entitled to more free glue than they have
    if (freeGlueEntitled > currentFreeGlue) {
      return "FREE"
    }

    // Always show price for additional quantities
    return product.price
  }

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/wall-panels/${collection.id}`}
            className="block border rounded-xl overflow-hidden group transition-transform transform hover:scale-[1.02] hover:shadow-xl flex flex-col"
          >
            {/* Image */}
            <div className="relative h-64">
              <Image
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-150 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
              <p className="text-muted-foreground mb-4">{collection.description}</p>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Available Colors:</h4>
                <div className="flex flex-wrap gap-2">
                  {collection.colors.map((color) => (
                    <span key={color} className="text-xs bg-muted px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Button aligned at bottom */}
              <div className="mt-auto">
                <Button className="w-full bg-[#e80808] hover:bg-[#c80707] text-white">View Collection</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
{/* related products */}
     <RelatedProducts  />
    </div>
  )
}
