"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { toast } from "@/hooks/use-toast"

export default function RelatedProducts({ onOpenCart }: { onOpenCart?: () => void }) {
  return <></>
}
