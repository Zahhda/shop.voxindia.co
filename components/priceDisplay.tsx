"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PriceDisplayProps {
  displayPrice?: number;
  finalMrpPerBox?: number;
  perSqFtDiscount?: number;
  sqftPerBox?: number;
  basePrice: number;
  priceMode: "panel" | "box";
}

export default function PriceDisplay({
  displayPrice,
  finalMrpPerBox,
  perSqFtDiscount,
  sqftPerBox,
  basePrice,
  priceMode
}: PriceDisplayProps) {
  const isPanelMode = priceMode === "panel";

  // If no sale price provided, show base price
  if (!displayPrice) {
    return (
      <div className="space-y-1">
        <p className="text-3xl font-bold text-primary">
          ₹{basePrice.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          {isPanelMode ? "1 panel" : "16 pcs per box"}
        </p>
      </div>
    );
  }

  // For panel mode: enforce 5% discount and compute MRP on-the-fly
  let computedMrp: number | undefined = finalMrpPerBox;
  let discountPercentage = 0;
  if (isPanelMode) {
    discountPercentage = 5;
    computedMrp = parseFloat((displayPrice / 0.95).toFixed(2));
  } else if (displayPrice && finalMrpPerBox) {
    discountPercentage = Math.round(((finalMrpPerBox - displayPrice) / finalMrpPerBox) * 100);
  }

  const hasDiscount = discountPercentage > 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <motion.p
          className="text-3xl font-bold text-primary"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ₹{displayPrice.toLocaleString()}
        </motion.p>

        {hasDiscount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Badge className="bg-red-600 text-red-50 hover:bg-red-600 hover:text-red-50">
              {discountPercentage}% OFF
            </Badge>
          </motion.div>
        )}
      </div>

      {hasDiscount && computedMrp !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">MRP: </span>
          <span className={cn("text-sm line-through", "text-red-500 font-medium")}>₹{computedMrp.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">
            {isPanelMode ? "per panel" : "per box"}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div className="bg-muted/50 p-2 rounded-md text-center">
          <p className="text-xs text-muted-foreground">Per sq.ft</p>
          <p className="font-medium">₹{perSqFtDiscount?.toFixed(2) || "-"}</p>
        </div>

        <div className="bg-muted/50 p-2 rounded-md text-center">
          <p className="text-xs text-muted-foreground">
            {isPanelMode ? "Per panel" : "Per box"}
          </p>
          <p className="font-medium">
            {sqftPerBox ? `${sqftPerBox} sq.ft` : isPanelMode ? "1 panel" : "16 pcs"}
          </p>
        </div>
      </div>
    </div>
  );
}
