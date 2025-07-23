// ✅ Checkout Page UI and Payment Flow Updated
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cashfree");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        parsed.forEach((item) => updateItemQuantity(item.productId, item.quantity));
      }
    }
  }, [cart.length, updateItemQuantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateQuantity = (productId: string, delta: number) => {
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty > 0) updateItemQuantity(productId, newQty);
    else removeFromCart(productId);
  };

  const handleSubmit = async () => {
    const missing = Object.values(formData).some((v) => v.trim() === "");
    if (missing) {
      setError("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");

    const orderPayload = {
      ...formData,
      cartItems: cart,
      totalAmount: total,
      method: paymentMethod === "cod" ? "COD" : "Cashfree",
    };

    try {
      if (paymentMethod === "cod") {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        clearCart();
        localStorage.removeItem("cart");
        router.push("/checkout/success");
        return;
      }

      const res = await fetch("/api/paymentlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.payment_link_url && data.order_id) {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        clearCart();
        localStorage.removeItem("cart");
        window.location.href = data.payment_link_url;
      } else {
        setError("Failed to initiate payment.");
        router.push("/checkout/failure?reason=payment_failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      router.push("/checkout/failure?reason=server_error");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && typeof window !== "undefined") {
    return <p className="text-center py-10 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-gradient bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
        Checkout
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-xl border">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.entries(formData) as [keyof typeof formData, string][]).map(
              ([field, value]) => (
                <Input
                  key={field}
                  name={field}
                  value={value}
                  onChange={handleChange}
                  placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                  required
                />
              )
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl border">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={50}
                      height={50}
                      className="rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback.png";
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                      📦
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    {item.colorName && <p className="text-sm text-gray-600">Variant: {item.colorName}</p>}
                    {item.mode && <p className="text-sm text-gray-600">Mode: {item.mode}</p>}
                    <div className="flex items-center gap-2 mt-1">
                      <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.productId, -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button size="icon" variant="ghost" onClick={() => updateQuantity(item.productId, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />

          <div className="mb-4">
            <label className="block font-medium mb-1">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashfree"
                  checked={paymentMethod === "cashfree"}
                  onChange={(e) => setPaymentMethod(e.target.value as "cashfree" | "cod")}
                />
                Cashfree (UPI, Card, Wallet)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value as "cashfree" | "cod")}
                />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <div className="text-lg font-semibold flex justify-between mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <Button
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg mt-2 hover:opacity-90"
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Processing..." : `Pay ₹${total}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
