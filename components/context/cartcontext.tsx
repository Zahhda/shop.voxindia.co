// context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

// ✅ 1. Define type
export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
  colorName?: string;
  mode?: string;
}

interface CartContextType {
  cart: CartItem[];
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

// ✅ 2. Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// ✅ 3. Provider
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const updateItemQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, updateItemQuantity, removeFromCart, clearCart }} // ✅ very important
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ 4. Hook
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
