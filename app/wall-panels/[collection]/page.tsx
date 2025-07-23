// app/wall-panels/[collection]/page.tsx
import { notFound, redirect } from 'next/navigation'
interface Color {
  name: string
  slug: string
  hex: string
}

interface CollectionData {
  id: string
  name: string
  description: string
  colors: Color[]
  dimensions: { width: string; height: string; thickness: string }
  features: string[]
  price: number
  sku: string
}

// Mirror your collection → colors mapping:
const collections: Record<string, CollectionData> = {
  "s-line": {
    id: "s-line",
    name: "S-Line",
    description: "Narrow lamellas for a taller, cozier space",
    colors: [
      { name: "White", slug: "white", hex: "#FFFFFF" },
      { name: "Grey", slug: "grey", hex: "#808080" },
      { name: "Anthracite", slug: "anthracite", hex: "#383838" },
      { name: "Black", slug: "black", hex: "#000000" },
      { name: "Mocca", slug: "mocca", hex: "#6F4E37" },
      { name: "Natural", slug: "natural", hex: "#D2B48C" },
      { name: "Natural Black", slug: "natural-black", hex: "#2C2C2C" },
    ],
    dimensions: { width: "122 mm", height: "3050 mm", thickness: "12 mm" },
    features: [
      "Sound-absorbing properties",
      "Lightweight construction",
      "Easy to clean",
      "Quick installation",
      "100% recyclable material",
    ],
    price: 49.99,
    sku: "SL",
  },
  "m-line": {
    id: "m-line",
    name: "M-Line",
    description: "Medium-width lamellas with extra depth",
    colors: [
      { name: "White", slug: "white", hex: "#FFFFFF" },
      { name: "Grey", slug: "grey", hex: "#808080" },
      { name: "Anthracite", slug: "anthracite", hex: "#383838" },
      { name: "Black", slug: "black", hex: "#000000" },
      { name: "Mocca", slug: "mocca", hex: "#6F4E37" },
      { name: "Natural", slug: "natural", hex: "#D2B48C" },
      { name: "Natural Black", slug: "natural-black", hex: "#2C2C2C" },
      { name: "Chocolate", slug: "chocolate", hex: "#7B3F00" },
    ],
    dimensions: { width: "122 mm", height: "3050 mm", thickness: "12 mm" },
    features: [
      "Sound-absorbing properties",
      "Lightweight construction",
      "Easy to clean",
      "Quick installation",
      "100% recyclable material",
    ],
    price: 59.99,
    sku: "ML",
  },
  "l-line": {
    id: "l-line",
    name: "L-Line",
    description: "Wide lamellas for bold visual impact",
    colors: [
      { name: "White", slug: "white", hex: "#FFFFFF" },
      { name: "Grey", slug: "grey", hex: "#808080" },
      { name: "Anthracite", slug: "anthracite", hex: "#383838" },
      { name: "Mocca", slug: "mocca", hex: "#6F4E37" },
      { name: "Natural", slug: "natural", hex: "#D2B48C" },
      { name: "Chocolate", slug: "chocolate", hex: "#7B3F00" },
    ],
    dimensions: { width: "122 mm", height: "3050 mm", thickness: "12 mm" },
    features: [
      "Sound-absorbing properties",
      "Lightweight construction",
      "Easy to clean",
      "Quick installation",
      "100% recyclable material",
    ],
    price: 69.99,
    sku: "LL",
  },
};

export default async function Page({ params }: { params: { collection: string } }) {
  // 1️⃣ Lookup the variant
  const { collection } = await params;


  const coll = collections[collection]
  if (!coll) {
    // Render your 404 page if the variant slug is invalid
    return notFound()
  }

  // 2️⃣ Pick this variant’s first color as the “default”
  const defaultColor = coll.colors[0].slug

  // 3️⃣ Redirect; this throws the NEXT_REDIRECT signal internally
  //    and Next.js will intercept it—no catch needed :contentReference[oaicite:0]{index=0}
  redirect(`/wall-panels/${collection}/${collection}-${defaultColor}`)
}
