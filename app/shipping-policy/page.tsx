// File: pages/shipping-policy.js

import React from "react";

export default function ShippingPolicy() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">SHIPPING POLICY</h1>

      {/* Delivery of Products Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Delivery of Products</h2>
        <p className="mb-4">
          We are committed to ensuring that your orders are delivered to you in a timely and secure manner. Below is an overview of our delivery process, policies, and guidelines to help you understand how we handle your orders:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            Orders are shipped from our own warehouses, third-party warehouses, or partner stores/offices located across various regions in India. We strive to deliver your products within <strong>8–14 business days</strong> from the date of order confirmation and payment receipt. The exact delivery time may vary depending on your location and the availability of the product. You will receive timely updates regarding the status of your order, including shipping and delivery information, via email or SMS.
          </li>
          <li>
            Orders are delivered through third-party courier and logistics companies, or postal services, depending on your location and the nature of the product. Deliveries are scheduled based on the availability of time slots with the delivery partner and the customer’s convenience. You will be informed in advance to schedule a suitable delivery time.
          </li>
          <li>
            All deliveries require a signature upon receipt to confirm successful delivery. If someone other than the person who placed the order signs or receives on behalf of the recipient, we cannot be held responsible for any issues arising from this. Please ensure that the recipient at the delivery address is authorized to accept the package.
          </li>
          <li>
            Since transactions are authorized by the cardholder, it is the customer’s responsibility to provide the correct delivery address when placing the order. We are not liable for delays or failed deliveries resulting from incorrect or incomplete addresses provided by the customer.
          </li>
          <li>
            We are not responsible for damage to products after delivery. Customers are encouraged to inspect the package at the time of delivery and report any visible damage or issues immediately.
          </li>
          <li>
            If you encounter any shortages or damages to your order, you must report the issue to our customer service team within <strong>24 hours of delivery</strong>. The shortage or damage must be clearly noted and signed on the Proof of Delivery (POD) copy, which should be returned to the delivery person. Please report such issues through the “<a href="/contact" className="text-blue-600 underline">Contact Us</a>” page on our website or by reaching out to our customer support team directly.
          </li>
          <li>
            If a product is undelivered or returned to its origin, customers are entitled to receive a full refund against the invoice. We request customers to cross-check the address before placing any order.
          </li>
        </ul>
      </section>

      {/* Delivery Charges Section */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Delivery Charges</h2>
        <p>
          Shipping and handling rates may vary based on product, packaging, size, volume, type, and other considerations. The shipping and handling charges are shown at the time of checkout, and customers will be informed of these charges before making payments.
        </p>
      </section>
    </main>
  );
}
