// app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const params = useSearchParams();
  const [status, setStatus] = useState("Verifying your payment...");

  useEffect(() => {
    const orderId = params.get("order_id");
    if (orderId) {
      fetch(`/api/verify-payment?order_id=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.order_status === "PAID") {
            setStatus("✅ Payment successful! Thank you for your order.");
          } else {
            setStatus("⚠️ Payment not confirmed yet. We will update you soon.");
          }
        })
        .catch(() => {
          setStatus("❌ Could not verify your payment. Please contact support.");
        });
    }
  }, [params]);

  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <p className="text-lg">{status}</p>
    </div>
  );
}
