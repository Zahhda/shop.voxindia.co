"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface CartItem {
  productId: string
  isGlue?: boolean
  productName?: string
  collectionId?: string
  colorName?: string
  colorSlug?: string
  price: number
  quantity: number
  image?: string
  mode?: "panel" | "box"
  area?: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (productId: string, colorName: string | undefined, quantity: number) => void
  removeItem: (productId: string, colorName: string | undefined) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Constants for free glue logic
const GLUE_THRESHOLD_SQFT = 30
const FREE_GLUE_ID = "FREE-GLUE-SKU"

// Helper functions
const getCurrentTotalSqft = (cartItems: CartItem[]) => {
  return cartItems
    .filter((item) => !item.isGlue && item.area && item.area > 0)
    .reduce((sum, item) => sum + (item.area || 0) * item.quantity, 0)
}

const getFreeGlueEntitled = (cartItems: CartItem[]) => {
  const totalSqft = getCurrentTotalSqft(cartItems)
  return Math.floor(totalSqft / GLUE_THRESHOLD_SQFT)
}

const getCurrentFreeGlueInCart = (cartItems: CartItem[]) => {
  return cartItems.find((item) => item.productId === FREE_GLUE_ID && item.isGlue)?.quantity || 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCart(Array.isArray(parsed) ? parsed : [])
      } catch {
        console.error("Bad cart JSON; resetting to []")
        setCart([])
      }
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  // Auto-manage free glue based on cart changes
  useEffect(() => {
    if (!isInitialized) return

    const currentTotalSqft = getCurrentTotalSqft(cart)
    const freeGlueEntitled = getFreeGlueEntitled(cart)
    const currentFreeGlue = getCurrentFreeGlueInCart(cart)

    if (freeGlueEntitled > 0 && currentFreeGlue === 0) {
      // Add free glue for the first time
      const freeGlueItem: CartItem = {
        productId: FREE_GLUE_ID,
        productName: "Soudal Fix All High Tack Glue (FREE)",
        collectionId: "related-products",
        colorName: "Default",
        price: 0,
        quantity: freeGlueEntitled,
        image: "/glue-main.png",
        area: 0,
        mode: "panel",
        isGlue: true,
      }

      setCart((prevCart) => [...prevCart, freeGlueItem])

      // Show toast notification
      if (typeof window !== "undefined") {
        import("@/hooks/use-toast")
          .then(({ toast }) => {
            toast({
              title: "Free glue added! 🎉",
              description: `You qualify for ${freeGlueEntitled} free glue with your ${currentTotalSqft.toFixed(1)} sq ft order`,
            })
          })
          .catch(() => {
            // Fallback if toast import fails
            console.log(
              `Free glue added! You qualify for ${freeGlueEntitled} free glue with your ${currentTotalSqft.toFixed(1)} sq ft order`,
            )
          })
      }
    } else if (freeGlueEntitled > currentFreeGlue && currentFreeGlue > 0) {
      // Increase existing free glue quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === FREE_GLUE_ID && item.isGlue ? { ...item, quantity: freeGlueEntitled } : item,
        ),
      )

      // Show toast notification
      if (typeof window !== "undefined") {
        import("@/hooks/use-toast")
          .then(({ toast }) => {
            toast({
              title: "More free glue added! 🎉",
              description: `You now qualify for ${freeGlueEntitled} free glue units with your ${currentTotalSqft.toFixed(1)} sq ft order`,
            })
          })
          .catch(() => {
            console.log(
              `More free glue added! You now qualify for ${freeGlueEntitled} free glue units with your ${currentTotalSqft.toFixed(1)} sq ft order`,
            )
          })
      }
    } else if (freeGlueEntitled < currentFreeGlue) {
      // Decrease or remove free glue
      if (freeGlueEntitled === 0) {
        setCart((prevCart) => prevCart.filter((item) => !(item.productId === FREE_GLUE_ID && item.isGlue)))
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === FREE_GLUE_ID && item.isGlue ? { ...item, quantity: freeGlueEntitled } : item,
          ),
        )
      }
    }
  }, [cart, isInitialized])

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.colorName === newItem.colorName &&
          i.mode === newItem.mode &&
          i.isGlue === newItem.isGlue,
      )

      if (existingIndex > -1) {
        const updated = [...prevCart]
        updated[existingIndex].quantity += newItem.quantity
        return updated
      } else {
        return [...prevCart, newItem]
      }
    })
  }

  const updateQuantity = (productId: string, colorName: string | undefined, quantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId === productId && item.colorName === colorName) {
          return { ...item, quantity }
        }
        return item
      })
    })
  }

  const removeItem = (productId: string, colorName: string | undefined) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => !(item.productId === productId && item.colorName === colorName))
    })
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
