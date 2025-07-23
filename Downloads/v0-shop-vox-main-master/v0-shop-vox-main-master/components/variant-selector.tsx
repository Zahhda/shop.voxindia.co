"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface VariantOption {
  id: string
  name: string
  description: string
}

interface VariantSelectorProps {
  variants: VariantOption[]
  selectedVariant: string
  onVariantChange: (variantId: string) => void
}

export default function VariantSelector({ variants, selectedVariant, onVariantChange }: VariantSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm">
        Variant: <span className="font-semibold">{variants.find((v) => v.id === selectedVariant)?.name}</span>
      </h3>
      <RadioGroup
        value={selectedVariant}
        onValueChange={onVariantChange}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {variants.map((variant) => (
          <div key={variant.id} className="relative">
            <RadioGroupItem value={variant.id} id={`variant-${variant.id}`} className="peer sr-only" />
            <Label
              htmlFor={`variant-${variant.id}`}
              className={cn(
                "flex flex-col h-full p-4 border-2 rounded-lg cursor-pointer transition-all",
                "hover:border-gray-400 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
              )}
            >
              <span className="font-medium">{variant.name}</span>
              {/* <span className="text-xs text-muted-foreground">{variant.description}</span> */}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
