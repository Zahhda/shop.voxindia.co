// app/checkout/success/SuccessPageContent.js
'use client';
import { useSearchParams } from 'next/navigation';

export default function SuccessPageContent() {
  const params = useSearchParams();
  const orderId = params.get('order_id');

  return <div>Payment Successful! Order ID: {orderId}</div>;
}
