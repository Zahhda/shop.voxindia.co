// ✅ Final Version: CheckoutPage.tsx with Razorpay + Cashfree + COD support, verification, and success redirection
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateItemQuantity, clearCart } = useCart();

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

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
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
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const missing = Object.values(formData).some((v) => v.trim() === "");
    if (missing) return setError("Please fill all required fields.");
    if (cart.length === 0) return setError("Your cart is empty.");

    setLoading(true);
    setError("");

    const orderPayload = {
      ...formData,
      cartItems: cart,
      totalAmount: total,
      method: paymentMethod.toUpperCase(),
    };

    try {
      if (paymentMethod === "cod") {
        const response = await fetch("/api/send-order-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        });
        const data = await response.json();
        if (data.success) {
          clearCart();
          localStorage.removeItem("cart");
          router.push("/checkout/success?method=cod");
        } else {
          setError("❌ Failed to send confirmation email. Please try again.");
        }
        return;
      }

      if (paymentMethod === "razorpay") {
        const razorRes = await fetch("/api/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalAmount: total }),
        });

        const razorData = await razorRes.json();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorData.amount,
          currency: razorData.currency,
          name: "Your Brand",
          description: "Complete Order Payment",
          order_id: razorData.id,
          handler: async function (response: any) {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verify = await verifyRes.json();
            if (verify.success) {
              await fetch("/api/send-order-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload),
              });
              clearCart();
              localStorage.removeItem("cart");
              router.push(`/checkout/success?razorpay_payment_id=${response.razorpay_payment_id}`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#1A202C" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        return;
      }

      if (paymentMethod === "cashfree") {
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
          setError("Failed to initiate Cashfree payment.");
        }
        return;
      }
    } catch (err) {
      console.error(err);
      setError("Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isClient && cart.length === 0)
    return <p className="text-center py-10 text-lg">Your cart is empty.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">🛒 Checkout</h1>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🧍 Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(formData).map(([field, value]) => (
              <input
                key={field}
                type="text"
                name={field}
                value={value}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                className="border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 rounded-lg px-4 py-3 text-sm"
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">📦 Order Summary</h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src={item.image || "/placeholder.jpg"} alt={item.productName} width={60} height={60} className="rounded-md" />
                  <div>
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              Razorpay (UPI, Card, Wallet)
            </label>
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