"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  const [paymentMethod, setPaymentMethod] = useState<"cashfree" | "cod">("cashfree");
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

      // For Cashfree payment
      const res = await fetch("/api/paymentlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (data.payment_link_url) {
        // Clear cart & redirect to payment page
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
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && typeof window !== "undefined") {
    return <p className="text-center py-10 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(formData).map(([field, value]) => (
              <input
                key={field}
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                required
                className="border p-2 rounded"
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between items-center gap-4">
                <div>{item.productName} × {item.quantity}</div>
                <div>₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 mb-4 font-semibold text-lg flex justify-between">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mb-4">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cashfree"
                checked={paymentMethod === "cashfree"}
                onChange={() => setPaymentMethod("cashfree")}
              />
              Cashfree (UPI, Card, Wallet)
            </label>
            <br />
            <label>
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

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
            className="w-full bg-black text-white py-3 rounded-lg mt-2"
          >
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  );
}
