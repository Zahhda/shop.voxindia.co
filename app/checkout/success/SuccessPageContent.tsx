"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessPageContent() {
  const params = useSearchParams();
  const razorpayPaymentId = params.get("razorpay_payment_id");
  const [status, setStatus] = useState("Verifying your order...");

  useEffect(() => {
    if (razorpayPaymentId) {
      setStatus("✅ Payment Successful! Thank you for your order.");
    } else {
      // Assume COD if no Razorpay ID present
      setStatus("✅ Order Placed via COD! Thank you for your order.");
    }
  }, [razorpayPaymentId]);

  return (
    <div className="flex flex-col justify-center items-center py-20 px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{status}</h1>
      {razorpayPaymentId && (
        <p className="text-lg text-gray-600">
          Your Razorpay Payment ID:{" "}
          <span className="font-semibold text-black">{razorpayPaymentId}</span>
        </p>
      )}
      <a
        href="/"
        className="mt-8 inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Continue Shopping
      </a>
    </div>
  );
}
