"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingBag, Menu, X, User, LogOut, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import CartSidebar from "./CartSidebar"
import Modal from "./Modal"
import { useAuth } from "@/context/AuthContext"
// import {  useRouter } from "next/navigation";       // ← import useRouter
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthModal from "@/context/AuthModal"
import { useWishlist } from "@/context/WishlistContext"
import WishlistSidebar from "./WishlistSidebar"

export default function Header() {
  const router = useRouter() // ← initialize router
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const { wishlist } = useWishlist()

  const totalItems = Array.isArray(cart) ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalWishlistItems = wishlist.length
  const isActive = (path: string) => pathname === path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    logout()
    // toast({
    //   title: "Logged out",
    //   description: "You have been successfully logged out.",
    // })
    if (pathname === "/my-profile") {
      router.push("/")
    }
  }

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-vox.svg" alt="Linerio Logo" width={80} height={32} />
            <span className="sr-only">Vox</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { label: "Home", path: "/" },
              // { label: "Linerio", path: "/wall-panels" },
              // { label: "About", path: "/about-us" },
              { label: "Contact", path: "/contact" },
            ].map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={cn("hover:text-primary transition-colors", isActive(path) && "font-medium text-primary")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wishlist"
              onClick={() => setWishlistOpen(true)}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalWishlistItems}
                </span>
              )}
            </Button>

            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Profile Icon - Always visible */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {user.image ? (
                      <Image
                        src={user.image || "/placeholder.svg"}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Profile"
                onClick={() => setShowAuthModal(true)}
                className="relative"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={toggleMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col items-center space-y-6 mt-16">
              {[
                { label: "Home", path: "/" },
                // { label: "VOX Wall Panels", path: "/wall-panels" },
                // { label: "About", path: "/about-us" },
                { label: "Contact", path: "/contact" },
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "text-xl hover:text-primary transition-colors",
                    isActive(path) && "font-medium text-primary",
                  )}
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              {user ? (
                <div className="flex flex-col items-center space-y-4 pt-6 border-t w-full">
                  <div className="text-center">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Link href="/my-profile" className="text-xl" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="text-xl text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4 pt-6 border-t w-full">
                  <button
                    onClick={() => {
                      setShowAuthModal(true)
                      toggleMenu()
                    }}
                    className="text-xl"
                  >
                    Sign In / Sign Up
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar & Modals */}
      <WishlistSidebar open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <CartSidebar open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} />
      <Modal show={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <AuthModal onClose={() => setShowAuthModal(false)} />
      </Modal>
    </header>
  )
}
