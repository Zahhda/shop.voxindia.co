import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductPageClient, { ProductProps } from "@/components/product-page-client";

// Imports
import { sLineImages, mLineImages, lLineImages } from "@/lib/image-data";
import { collections, CollectionData, ColourVariant } from "@/lib/Collections";

export const revalidate = 300;
// Helpers
export async function generateStaticParams() {
  const params = [];

  for (const [collectionId, collection] of Object.entries(collections)) {
    for (const variant of collection.colours) {
      params.push({
        collection: collectionId,
        product: `${collectionId}-${variant.slug}`,
      });
    }
  }

  return params;
}

function getVariantData(collectionId: string, productSlug: string) {
  const collection = collections[collectionId];
  if (!collection) return { collection: null, variant: null };

  const colorSlug = productSlug.replace(`${collectionId}-`, "");
  const variant = collection.colours.find((c) => c.slug === colorSlug);
  return { collection, variant };
}

function getImageList(collectionId: string): string[] {
  const map: Record<string, string[]> = {
    "s-line": sLineImages,
    "m-line": mLineImages,
    "l-line": lLineImages,
  };
  return (map[collectionId] || []).map((img) => `/${collectionId}/${img}`);
}

function buildProductProps(
  id: string,
  collection: CollectionData,
  variant: ColourVariant
): ProductProps {
  return {
    id,
    name: `${collection.name} Wall Panel`,
    description: collection.description,
    price: collection.price,
    sku: variant.indexCode,
    dimensions: collection.dimensions,
    boxSpecs: collection.boxSpecs,
    features: collection.features,
    currentVariantId: collection.id,
    colorSlug: variant.slug,
    availableColors: collection.colours,
    availableVariants: Object.values(collections).map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      colors: c.colours,
    })),
    collectionId: collection.id,
  };
}

interface PageParams {
  collection: string;
  product: string;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { collection: collId, product } = await params;

  const { collection, variant } = getVariantData(collId, product);
  if (!collection || !variant) {
    return { title: "Product Not Found | Linerio" };
  }

  return {
    title: `VOX ${collection.name} ${variant.name} Wall Panels | Linerio`,
    description: `${collection.description[0]} in ${variant.name}. Dimensions: ${collection.dimensions.width} x ${collection.dimensions.height} x ${collection.dimensions.thickness}.`,
  };
}

export default async function Page({ params }: { params: PageParams }) {
  const { collection: collId, product } = await params;

  const { collection, variant } = getVariantData(collId, product);
  if (!collection || !variant) return notFound();

  const imageFiles = getImageList(collId);
  const fullProduct = buildProductProps(product, collection, variant);

  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div className="space-y-8 animate-pulse">Loading...</div>}>
        <ProductPageClient product={fullProduct} images={imageFiles} />
      </Suspense>
    </div>
  );
}