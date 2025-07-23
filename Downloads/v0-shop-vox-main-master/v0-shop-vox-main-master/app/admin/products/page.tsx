import Link from "next/link"
import { Plus, FileUp, FileDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// This would come from your database in a real application
const products = [
  {
    id: "SL-WHITE",
    name: "S-Line White",
    collection: "S-Line",
    color: "White",
    price: 49.99,
    stock: 25,
    status: "active",
  },
  {
    id: "SL-GREY",
    name: "S-Line Grey",
    collection: "S-Line",
    color: "Grey",
    price: 49.99,
    stock: 18,
    status: "active",
  },
  {
    id: "SL-BLACK",
    name: "S-Line Black",
    collection: "S-Line",
    color: "Black",
    price: 49.99,
    stock: 12,
    status: "active",
  },
  {
    id: "ML-WHITE",
    name: "M-Line White",
    collection: "M-Line",
    color: "White",
    price: 59.99,
    stock: 20,
    status: "active",
  },
  {
    id: "ML-NATURAL",
    name: "M-Line Natural",
    collection: "M-Line",
    color: "Natural",
    price: 59.99,
    stock: 15,
    status: "active",
  },
  {
    id: "LL-ANTHRACITE",
    name: "L-Line Anthracite",
    collection: "L-Line",
    color: "Anthracite",
    price: 69.99,
    stock: 8,
    status: "active",
  },
  {
    id: "LL-CHOCOLATE",
    name: "L-Line Chocolate",
    collection: "L-Line",
    color: "Chocolate",
    price: 69.99,
    stock: 0,
    status: "out_of_stock",
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Link href="/admin/products/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
          <Button variant="outline">
            <FileUp className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-8" />
        </div>
        <select className="border rounded-md px-3 py-2">
          <option value="all">All Collections</option>
          <option value="s-line">S-Line</option>
          <option value="m-line">M-Line</option>
          <option value="l-line">L-Line</option>
        </select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Color</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.collection}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={product.status === "active" ? "default" : "destructive"}>
                    {product.status === "active" ? "Active" : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
