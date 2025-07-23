// import connectDB from "@/lib/mongodb"
// import ProductPageClient from "@/components/product-page-client"
// import { notFound } from "next/navigation"
// import { LineImages } from "@/models/LineImages";

// // This is a server component that fetches data
// export default async function ProductPage({
//   params,
// }: {
//   params: { variant: string; product: string }
// }) {
//   const { variant, product } = params

//   // Extract color from product slug (format: variant-color)
//   const colorSlug = product.replace(`${variant}-`, "")

//   try {
//     await connectDB()

//     // Fetch line images data
//     const lineImagesData = await LineImages.findOne({})

//     if (!lineImagesData) {
//       console.error("No line images data found")
//       notFound()
//     }

//     // Determine which line type to use based on variant
//     let lineType: "lLine" | "mLine" | "sLine"
//     if (variant.startsWith("l-")) {
//       lineType = "lLine"
//     } else if (variant.startsWith("m-")) {
//       lineType = "mLine"
//     } else {
//       lineType = "sLine"
//     }

//     // Get images for this line type
//     const images = lineImagesData[lineType] || []

//     // Fetch product data (mock for now, replace with your actual data fetching)
//     const product = {
//       id: variant,
//       name: `${variant.toUpperCase()} Wall Panel`,
//       description: "Premium slatted wall panels for modern interiors",
//       price: 2499,
//       sku: `WP-${variant.toUpperCase()}`,
//       dimensions: { width: "600mm", height: "2400mm", thickness: "12mm" },
//       features: ["Easy installation", "Moisture resistant", "Eco-friendly materials", "Sound absorbing"],
//       currentVariantId: variant,
//       colorSlug,
//       availableVariants: [
//         // Your variants data here
//       ],
//       availableColors: [
//         // Your colors data here
//       ],
//       collectionId: "wall-panels",
//     }

//     return (
//       <div className="container mx-auto py-12 px-4">
//         <ProductPageClient product={product} images={images} />
//       </div>
//     )
//   } catch (error) {
//     console.error("Error fetching product data:", error)
//     notFound()
//   }
// }
