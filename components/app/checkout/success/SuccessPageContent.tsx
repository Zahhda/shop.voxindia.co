"use client";
import { useSearchParams } from "next/navigation";

export default function SuccessPageContent() {
  const params = useSearchParams();
  const orderId = params.get("order_id");

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you for your order.</p>
      {orderId && <p>Order ID: <strong>{orderId}</strong></p>}
    </div>
  );
}
