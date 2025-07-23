"use client"

import { useState } from "react"
import { Heart, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/WishlistContext"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function WishlistSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isClosing, setIsClosing] = useState(false)

  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  // Handle move to cart
  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.productName || item.collectionId?.toUpperCase()} ${item.colorName} added to your cart.`,
    })
  }

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={handleClose} />}

      {/* Wishlist Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } ${isClosing ? "translate-x-full" : ""}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Your Wishlist</h2>
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto py-2 px-4">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Looks like you haven't added anything to your wishlist yet.
                </p>
                <Button onClick={handleClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {wishlist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="relative h-20 w-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.productName || "Product"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Heart className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium line-clamp-1">{item.productName || `Product ${item.productId}`}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground"
                          onClick={() => removeFromWishlist(item.productId, item.colorName)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>

                      {item.colorName && <p className="text-sm text-muted-foreground">Color: {item.colorName}</p>}
                      <p className="text-sm font-medium mt-1">₹{item.price.toFixed(2)}</p>

                      <div className="mt-auto pt-2">
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleMoveToCart(item)}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="grid gap-2">
                <Button variant="outline" className="w-full" onClick={clearWishlist}>
                  Clear Wishlist
                </Button>
                <Button variant="outline" className="w-full" onClick={handleClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
