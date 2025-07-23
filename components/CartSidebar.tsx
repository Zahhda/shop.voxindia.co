"use client"

import { useState, useEffect, useRef } from "react"
import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function CartSidebar({
  open,
  onClose,
  onOpen,
}: {
  open: boolean
  onClose: () => void
  onOpen: () => void
}) {
  const router = useRouter()
  const { cart, updateQuantity, removeItem } = useCart()
  const [isClosing, setIsClosing] = useState(false)
  const prevCartRef = useRef(cart)

  // Close animation
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300)
  }

  // Navigate to checkout (keep cart in localStorage for checkout page)
  const handleCheckout = () => {
    router.push("/checkout")
  }

  // Filter out any glue (free) items
  const displayItems = cart.filter(item => !item.isGlue)

  // Total calculation excluding free items
  const totalPrice = displayItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Auto-open when item added
  useEffect(() => {
    if (!open) {
      const prev = prevCartRef.current
      cart.forEach(item => {
        const old = prev.find(
          i => i.productId === item.productId && i.colorName === item.colorName
        )
        if (old && item.quantity > old.quantity) onOpen()
      })
    }
    prevCartRef.current = cart
  }, [cart, open, onOpen])

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={handleClose} />}
      <div
        className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } ${isClosing ? "translate-x-full" : ""}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                {displayItems.length} {displayItems.length === 1 ? "item" : "items"}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Items (scrollable) */}
          <div className="flex-1 overflow-y-auto py-2 px-4">
            {displayItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button onClick={handleClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayItems.map(item => (
                  <div
                    key={`${item.productId}-${item.colorName}-${item.mode}`}
                    className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors"
                  >
                    <div className="relative h-20 w-20 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium line-clamp-1">{item.productName}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground"
                          onClick={() => removeItem(item.productId, item.colorName)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>

                      {/* <p className="text-xs text-muted-foreground">{item.mode === "panel" ? "By Panel" : "By Box"}</p> */}
                      {item.colorName && item.colorName !== "Default" && (
                        <p className="text-sm text-muted-foreground">Color: {item.colorName}</p>
                      )}

                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.productId, item.colorName, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.productId, item.colorName, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ₹
                            {(item.price * item.quantity).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {displayItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                <Button variant="outline" className="w-full" onClick={handleClose}>Continue Shopping</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
