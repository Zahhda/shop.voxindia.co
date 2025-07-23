import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Package, Users, ShoppingBag, Settings, BarChart, LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin Dashboard | Linerio",
  description: "Manage your Linerio e-commerce store",
}

async function getUser() {
  // Mock admin user for demo purposes
  return {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  // In a real app, redirect if not authenticated or not an admin
  if (!user || user.role !== "admin") {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r hidden md:block">
        <div className="p-6">
          <Link href="/admin" className="text-2xl font-bold">
            LINERIO ADMIN
          </Link>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                href="/admin/customers"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Users className="h-5 w-5" />
                Customers
              </Link>
            </li>
            <li>
              <Link
                href="/admin/analytics"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <BarChart className="h-5 w-5" />
                Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-background flex items-center px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium">{user.name}</span>
            </span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
