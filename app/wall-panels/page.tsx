// import type { Metadata } from "next"
// import ProductCollection from "@/components/product-collection"

// export const metadata: Metadata = {
//   title: "Wall Panels Collection | Linerio",
//   description:
//     "Explore our premium slatted wall panel collections: S-Line, M-Line, and L-Line. Available in multiple colors and finishes.",
// }

// export default function WallPanelsPage() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h1 className="text-4xl font-bold mb-4">Wall Panel Collections</h1>
//       <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
//         Our premium slatted wall panels are made from 100% recyclable polystyrene with hot-stamp finish. Lightweight,
//         durable, easy to clean, and sound-absorbing with quick & easy glue-on installation.
//       </p>

//       <ProductCollection />
//     </div>
//   )
// }
import type { Metadata } from "next"
import Image from "next/image"
import BannerSection from "@/components/banner-section"
import ProductCollection from "@/components/product-collection"

export const metadata: Metadata = {
  title: "Wall Panels Collection | Linerio",
  description:
    "Explore our premium slatted wall panel collections: S-Line, M-Line, and L-Line. Available in multiple colors and finishes.",
}

const bannerImages = [
  {
    src: "/VOX_LINERIO_XS_MICRO_MOCCA__99439_small_11zon.webp",
    alt: "Linerio XS Micro Mocca",
  },
  {
    src: "/S_M_L-Line_Linerio_Anthracite_Vox_64438_medium_11zon need_11zon.webp",
    alt: "Linerio XS Micro Mocca Alternate",
  },
  {
    // public/VOX_LINERIO_XS_MICRO_MOCCA__99439_small_11zon.webp
    src: "/S_M_L-Line_Linerio_Anthracite_Vox_64416_medium_11zon need_11zon.webp",
    alt: "S/M/L Line Anthracite",
  },
]

export default function WallPanelsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <BannerSection images={bannerImages} />
      <ProductCollection />
    </div>
  )
}