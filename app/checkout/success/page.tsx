"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SuccessPage() {
  const params = useSearchParams();

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      const emailData = {
        customerEmail: "customer@example.com", // Ideally get this from user context
        customerName: "Zahid",                 // Get from order context or session
        orderSummary: {
          orderId: params.get("order_id") || "ORD123456",
          items: [
            { name: "S-Line Panel", qty: 2, price: 1200 },
            { name: "L-Line Panel", qty: 1, price: 1800 },
          ],
          total: 4200,
        },
      };

      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Confirmation email sent!");
      } else {
        toast.error("Failed to send confirmation email.");
      }
    };

    sendConfirmationEmail();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase. A confirmation email has been sent.</p>
    </div>
  );
}
