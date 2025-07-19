"use client"

import { useState, useMemo, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import ColorSelector from "@/components/color-selector"
import VariantSelector from "@/components/variant-selector"
import AddToCartForm from "@/components/add-to-cart-form"
import ImageGallery from "@/components/ImageGallery"
import PriceDisplay from "@/components/priceDisplay"
import Accordion from "./accordion"
import PluginLogos from "./PluginLogo"
import CartSidebar from "@/components/CartSidebar"
import RelatedProduct from "./ui/RelatedProduct"

interface Color {
  name: string
  slug: string
  hex: string
  indexCode?: string
  primaryCostPerSqFt?: number
  sqftPerBox?: number
  mrpPerBoxInclGst?: number
  addShippingCharge?: number
  priceAfterShipping?: number
  discMarginPercent?: number
  priceAfterDiscMargin?: number
  installCharge?: number
  priceAfterInstall?: number
  finalMrpPerBox?: number
  perSqFt?: number
  displayPrice?: number
  perSqFtDiscount?: number
}

interface VariantData {
  id: string
  name: string
  description: string
  colors: Color[]
}

export interface ProductProps {
  id: string
  name: string
  description: string[]
  price: number
  sku: string
  dimensions: { width: string; height: string; thickness: string }
  boxSpecs: { each_box_contains: string; each_box_area: string; qty: string }
  features: string[]
  currentVariantId: string
  colorSlug: string
  availableVariants: VariantData[]
  availableColors: Color[]
  collectionId: string
}

interface ClientProps {
  product: ProductProps
  images: string[]
}

export default function ProductPageClient({ product, images }: ClientProps) {
  const panelPricingMap: Record<string, number> = {
    "s-line": 1779,
    "m-line": 1729,
    "l-line": 2239,
  }

  const panelSqftPerPanel = 4.005
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<string>(product.currentVariantId)
  const [selectedColor, setSelectedColor] = useState<string>(product.colorSlug ?? product.availableColors[0].slug)
  const [isPending, startNav] = useTransition()
  const [galleryIndex, setGalleryIndex] = useState<number>(0)
  const [priceMode, setPriceMode] = useState<"panel" | "box">("panel")
  const [cartOpen, setCartOpen] = useState(false)

  const lineFolder = useMemo(() => {
    if (selectedVariant.startsWith("l-")) return "l-line"
    if (selectedVariant.startsWith("m-")) return "m-line"
    return "s-line"
  }, [selectedVariant])

  const filteredColors = useMemo<Color[]>(() => {
    const variant = product.availableVariants.find((v) => v.id === selectedVariant)
    return variant?.colors || []
  }, [selectedVariant, product.availableVariants])

  // Find the current product image based on selected variant and color
  const currentProductImage = useMemo(() => {
    const imagePattern = `${lineFolder}-${selectedColor}`
    const matchingImage = images.find((img) => img.includes(imagePattern))
    return matchingImage || images[0] || `/images/${lineFolder}/${lineFolder}-${selectedColor}.jpg`
  }, [images, lineFolder, selectedColor])

  useEffect(() => {
    if (!filteredColors.some((c) => c.slug === selectedColor)) {
      setSelectedColor(filteredColors[0]?.slug || "")
    }
  }, [filteredColors])

  useEffect(() => {
    const newIndex = images.findIndex((img) => img.includes(`${lineFolder}-${selectedColor}`))
    setGalleryIndex(newIndex >= 0 ? newIndex : 0)
  }, [selectedColor, selectedVariant, images, lineFolder])

  const handleVariantChange = (variantId: string) => {
    if (variantId === selectedVariant) return
    setSelectedVariant(variantId)
    startNav(() => {
      router.push(`/wall-panels/${variantId}/${variantId}-white`)
    })
  }

  const handleColorChange = (slug: string) => {
    if (slug === selectedColor) return
    setSelectedColor(slug)
    startNav(() => {
      router.push(`/wall-panels/${selectedVariant}/${selectedVariant}-${slug}`)
    })
  }

  const activeColor = filteredColors.find((c) => c.slug === selectedColor)
  const colorName = activeColor?.name || "Select a color"

  const panelPrice = panelPricingMap[lineFolder]
  const panelSqft = panelSqftPerPanel
  const panelSqftPrice = panelPrice / panelSqftPerPanel

  const boxPrice = activeColor?.displayPrice || product.price
  const boxSqft = activeColor?.sqftPerBox
  const boxSqftPrice = activeColor?.perSqFtDiscount

  const effectiveDisplayPrice = priceMode === "panel" ? panelPrice : boxPrice
  const effectiveSqft = priceMode === "panel" ? panelSqft : boxSqft
  const effectiveSqftPrice = priceMode === "panel" ? panelSqftPrice : boxSqftPrice

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative">
          <ImageGallery
            images={images}
            initialIndex={galleryIndex}
            lineType={lineFolder as "l-line" | "m-line" | "s-line"}
            onColorChange={handleColorChange}
          />
        </div>

        <div className="space-y-8">
          <header>
            <h1 className="text-4xl font-bold mb-2">VOX {product.name}</h1>
            <p className="text-2xl font-medium text-muted-foreground mb-6">{colorName}</p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium text-muted-foreground">Select type:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPriceMode("panel")}
                  className={`px-4 py-1 rounded-full border ${priceMode === "panel" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  By Panel
                </button>
                {/* <button
                  onClick={() => setPriceMode("box")}
                  className={`px-4 py-1 rounded-full border ${priceMode === "box" ? "bg-primary text-white" : "bg-muted"}`}
                >
                  By Box
                </button> */}
              </div>
            </div>

            <div className="mb-8">
              <PriceDisplay
                displayPrice={effectiveDisplayPrice}
                finalMrpPerBox={activeColor?.finalMrpPerBox}
                perSqFtDiscount={effectiveSqftPrice}
                sqftPerBox={effectiveSqft}
                basePrice={product.price}
                priceMode={priceMode}
              />
            </div>
          </header>

          <div className="space-y-6">
            <VariantSelector
              variants={product.availableVariants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
            <ColorSelector colors={filteredColors} selectedColor={selectedColor} onColorChange={handleColorChange} />
          </div>

          {/* Show single AddToCartForm that responds to tab */}
          <AddToCartForm
            productId={product.id}
            collectionId={product.collectionId}
            colorName={colorName}
            price={effectiveDisplayPrice}
            productName={product.name}
            area={effectiveSqft}
            lineType={lineFolder}
            colorSlug={selectedColor}
            mode={priceMode}
            onOpenCart={() => setCartOpen(true)}
            productImage={currentProductImage}
          />

          <h2 className="text-xl font-bold mb-4">Why Choose Us</h2>
          <PluginLogos />
        </div>

        <CartSidebar
          open={cartOpen}
          onOpen={() => setCartOpen(true)}
          onClose={() => setCartOpen(false)}
          mode={priceMode}
        />
      </div>
      <RelatedProduct />
      <Accordion />
    </>
  )
}
