import * as Tooltip from "@radix-ui/react-tooltip"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ColorSelector({ colors, selectedColor, onColorChange }) {
  return (
    <Tooltip.Provider>
      <div className="space-y-2">
        <h3 className="font-medium text-sm">
          Color: <span className="font-semibold">
            {colors.find(c => c.slug === selectedColor)?.name}
          </span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <Tooltip.Root key={color.slug}>
              <Tooltip.Trigger asChild>
                <button
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedColor === color.slug
                      ? "border-primary scale-110"
                      : "border-muted hover:border-gray-400"
                  )}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => onColorChange(color.slug)}
                  aria-label={`Select ${color.name} color`}
                >
                  {selectedColor === color.slug && (
                    <Check
                      className={cn(
                        "h-5 w-5",
                        ["white", "natural"].includes(color.slug)
                          ? "text-black"
                          : "text-white"
                      )}
                    />
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                side="top"
                align="center"
                className="px-2 py-1 text-xs rounded bg-gray-800 text-white"
              >
                {color.name}
                <Tooltip.Arrow className="fill-current text-gray-800" />
              </Tooltip.Content>
            </Tooltip.Root>
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  )
}
