"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateItemQuantity, removeFromCart, clearCart } = useCart();

  const [isClient, setIsClient] = useState(false);
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

  const [paymentMethod, setPaymentMethod] = useState<"cashfree" | "cod">("cashfree");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    setIsClient(true);

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

      if (data.payment_link) {
        await fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        clearCart();
        localStorage.removeItem("cart");
        window.location.href = data.payment_link;
      } else {
        setError("Failed to initiate payment.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isClient && cart.length === 0) {
    return <p className="text-center py-10 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">🧾 Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🧍 Billing Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(formData).map(([field, value]) => (
              <input
                key={field}
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                required
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 transition rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400"
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🛍️ Order Summary</h2>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm text-gray-700">
                <span>{item.productName} × {item.quantity}</span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="text-lg font-bold flex justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cashfree"
                checked={paymentMethod === "cashfree"}
                onChange={() => setPaymentMethod("cashfree")}
              />
              Cashfree (UPI, Card, Wallet)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
            className="w-full bg-black text-white hover:bg-gray-800 transition py-3 rounded-xl text-lg mt-6"
          >
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  );
}
