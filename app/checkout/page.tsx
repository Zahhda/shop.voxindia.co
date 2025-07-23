"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart, CartItem } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

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

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0 && typeof updateQuantity === "function") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        try {
          const parsed: CartItem[] = JSON.parse(stored);
          parsed.forEach((item) =>
            updateQuantity(item.productId, item.colorName, item.quantity)
          );
        } catch {
          console.warn("Failed to parse stored cart");
        }
      }
    }
  }, [cart.length, updateQuantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateQuantityHandler = (
    productId: string,
    colorName: string | undefined,
    delta: number
  ) => {
    const item = cart.find(
      (i) => i.productId === productId && i.colorName === colorName
    );
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty > 0) updateQuantity(productId, colorName, newQty);
    else removeItem(productId, colorName);
  };

  const loadRazorpayScript = () =>
    new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubmit = async () => {
    if (
      Object.values(formData).some((v) => v.trim() === "") ||
      cart.length === 0
    ) {
      setError("Please fill all required fields and add items to the cart.");
      return;
    }

    setLoading(true);
    setError("");

    const orderPayload = {
      ...formData,
      cartItems: cart,
      totalAmount: total,
      method: paymentMethod === "cod" ? "COD" : "Razorpay",
    };

    try {
      if (paymentMethod === "cod") {
        try {
          await fetch("/api/send-order-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
          });
        } catch (err) {
          console.warn("Failed to send COD order email, continuing to success");
        }
        clearCart();
        localStorage.removeItem("cart");
        router.push("/checkout/success");
        return;
      }

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }),
      });

      const data = await res.json();

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        setError("Failed to load payment gateway. Please try again.");
        setLoading(false);
        return;
      }

      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "QuickCart",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response: any) => {
          try {
            await fetch("/api/send-order-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(orderPayload),
            });
          } catch (err) {
            console.warn("Failed to send order email after payment success");
          }
          clearCart();
          localStorage.removeItem("cart");
          router.push("/checkout/success");
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: `${formData.addressLine1} ${formData.addressLine2}, ${formData.city}, ${formData.state}, ${formData.zip}`,
        },
        theme: { color: "#000000" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-50 py-12 px-6 sm:px-16 font-sans">
      <h1 className="text-center text-5xl font-extrabold tracking-tight mb-14 text-gray-900">
        Checkout
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Billing Form */}
        <section className="lg:col-span-2 bg-white bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-gray-200">
          <h2 className="text-3xl font-medium mb-8 tracking-wide text-gray-900">
            Billing Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {(Object.entries(formData) as [keyof typeof formData, string][]).map(
              ([field, value]) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={value}
                  onChange={handleChange}
                  placeholder={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (s) => s.toUpperCase())}
                  required
                  className="w-full rounded-xl border border-gray-300 px-5 py-3 text-gray-900 text-lg placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-30 transition"
                />
              )
            )}
          </div>
        </section>

        {/* Order Summary */}
        <aside className="bg-white bg-opacity-60 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200 sticky top-24 h-fit">
          <h2 className="text-3xl font-medium mb-6 tracking-wide text-gray-900">
            Order Summary
          </h2>

          <ul className="divide-y divide-gray-200 max-h-[480px] overflow-y-auto mb-6">
            {cart.map((item) => (
              <li
                key={item.productId + (item.colorName ?? "")}
                className="flex justify-between items-center py-4"
              >
                <div className="flex items-center space-x-4">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.productName}
                      width={56}
                      height={56}
                      className="rounded-2xl"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center text-2xl">
                      📦
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-lg text-gray-900">
                      {item.productName}
                    </p>
                    {item.colorName && (
                      <p className="text-sm text-gray-500">Variant: {item.colorName}</p>
                    )}
                    {item.mode && (
                      <p className="text-sm text-gray-500">Mode: {item.mode}</p>
                    )}

                    <div className="flex items-center space-x-3 mt-2">
                      <button
                        onClick={() =>
                          updateQuantityHandler(item.productId, item.colorName, -1)
                        }
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-lg font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantityHandler(item.productId, item.colorName, 1)
                        }
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <p className="font-semibold text-lg text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          <fieldset className="mb-6 space-y-4">
            <legend className="font-semibold text-gray-900 text-lg mb-2">
              Payment Method
            </legend>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as "razorpay" | "cod")
                }
                className="w-5 h-5 text-black accent-black"
              />
              <span className="text-gray-900 text-lg">
                Razorpay (Card, UPI, Wallet)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as "razorpay" | "cod")
                }
                className="w-5 h-5 text-black accent-black"
              />
              <span className="text-gray-900 text-lg">Cash on Delivery (COD)</span>
            </label>
          </fieldset>

          <div className="flex justify-between items-center font-semibold text-2xl mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {error && (
            <p className="text-red-600 mb-4 text-sm font-medium" role="alert">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || cart.length === 0}
            className={`w-full py-4 rounded-3xl font-semibold text-white transition ${
              loading || cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>
        </aside>
      </div>
    </div>
  );
}
