"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PaymentStatus() {
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

  return <p className="text-lg">{status}</p>;
}

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <PaymentStatus />
      </Suspense>
    </div>
  );
}
