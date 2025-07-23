"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// Define the wishlist item type
export interface WishlistItem {
  productId: string
  productName?: string
  collectionId?: string
  colorName?: string
  price: number
  image?: string
}

// Define the wishlist context type
interface WishlistContextType {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (productId: string, colorName: string | undefined) => void
  isInWishlist: (productId: string, colorName: string | undefined) => boolean
  clearWishlist: () => void
}

// Create the wishlist context
const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

// Create a provider component
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        setWishlist([])
      }
    }
    setIsInitialized(true)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isInitialized])

  // Add item to wishlist
  const addToWishlist = (newItem: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if the item already exists in the wishlist
      const existingItemIndex = prevWishlist.findIndex(
        (item) => item.productId === newItem.productId && item.colorName === newItem.colorName,
      )

      if (existingItemIndex !== -1) {
        // Item already exists, don't add it again
        return prevWishlist
      } else {
        // Add new item if it doesn't exist
        return [...prevWishlist, newItem]
      }
    })
  }

  // Check if an item is in the wishlist
  const isInWishlist = (productId: string, colorName: string | undefined) => {
    return wishlist.some((item) => item.productId === productId && item.colorName === colorName)
  }

  // Remove item from wishlist
  const removeFromWishlist = (productId: string, colorName: string | undefined) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => !(item.productId === productId && item.colorName === colorName)),
    )
  }

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// Custom hook to use the wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
