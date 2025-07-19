import Link from "next/link"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// This would come from your database in a real application
const dashboardData = {
  totalSales: 12450.75,
  totalOrders: 142,
  totalCustomers: 98,
  totalProducts: 24,
  recentOrders: [
    { id: "ORD-001", customer: "John Doe", date: "2023-04-28", total: 249.99, status: "delivered" },
    { id: "ORD-002", customer: "Jane Smith", date: "2023-04-27", total: 349.5, status: "processing" },
    { id: "ORD-003", customer: "Robert Johnson", date: "2023-04-26", total: 124.75, status: "shipped" },
    { id: "ORD-004", customer: "Emily Davis", date: "2023-04-25", total: 199.99, status: "pending" },
  ],
  lowStockProducts: [
    { id: "SL-WHITE", name: "S-Line White", stock: 5 },
    { id: "ML-BLACK", name: "M-Line Black", stock: 3 },
    { id: "LL-NATURAL", name: "L-Line Natural", stock: 2 },
  ],
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5.7% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Across 3 collections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-sm capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {product.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                      {product.stock} left
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/admin/products">
                <Button variant="outline" className="w-full">
                  Manage Inventory
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
