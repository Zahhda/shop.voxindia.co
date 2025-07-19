// File: pages/purchase-policy.js

import React from "react";

export default function PurchasePolicy() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">
        PURCHASE, RETURNS AND CANCELLATION POLICY
      </h1>

      {/* Intro Paragraph */}
      <p className="mb-6">
        We offer a flexible and customer-oriented Return and Cancellation Policy for all products from the date of delivery.
      </p>

      {/* Returns Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Returns are accepted only for the following reasons:</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Damaged Product</li>
          <li>Manufacturing Defect</li>
          <li>Incomplete Product</li>
          <li>Incorrect Product</li>
        </ul>
        <p className="mb-4">
          The time frame starts from the date the product was delivered as per the confirmation received from our logistics team or courier partners.
        </p>
        <p className="mb-6">
          Please send us 3–4 images (including images of the damaged part and the entire product) of the product to ascertain the reason for return. Returns can be initiated from the “Contact Us” section or by sending an email to{" "}
          <a href="mailto:customercare@voxindia.co" className="text-blue-600 underline">
            customercare@voxindia.co
          </a>
          .
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            We are responsible for what we sell. If the product is damaged, defective, incorrect, or incomplete, please inform us within <strong>24 hours of delivery</strong> to be eligible for a 100% replacement.
          </li>
          <li>
            We offer hassle-free replacement through courier pickup requests via email. You do not have to bear any courier or shipping charges.
          </li>
          <li>
            All products bought online can only be returned in case of manufacturing defects, damaged product delivery, or incorrect/incomplete items. This needs to be brought to our notice via email within <strong>24 hours from the delivery/assembly date</strong>. To return furniture, you can reach us at{" "}
            <a href="mailto:customercare@voxindia.co" className="text-blue-600 underline">
              customercare@voxindia.co
            </a>
            , or call us on <a href="tel:+919528500500" className="text-blue-600 underline">+91-9528500500</a>.
          </li>
          <li>
            Any product returned to us should be in the same condition as received, in its original packaging, with invoice and tags intact.
          </li>
          <li>
            VOX Interior and Exterior Solutions Pvt. Ltd. is committed to ensuring your satisfaction with any merchandise you have ordered from us.
          </li>
        </ul>
      </section>

      {/* Returns/Exchange Through Courier */}
      <section className="mb-8">
        <h2 className="text-2xl font-medium mb-4">Returns/Exchange through Courier</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            Replacement through courier shall only be done for products with exactly the same price as the product being returned. Please indicate clearly the replacement merchandise, and our Customer Care Associate will check and confirm availability and whether the replacement can be made.
          </li>
          <li>
            After the merchandise is received and verified by our team, we shall process a refund/replacement within <strong>15–30 days</strong> of receipt of the merchandise. For remote locations or Tier 2/Tier 3 cities, we may take additional time to process a replacement request.
          </li>
          <li>
            Refunds to the cardholder’s credit or debit card will only be credited back to the same account used for the original transaction.
          </li>
          <li>
            For any queries or concerns about our returns and exchange policy, please call <a href="tel:+919528500500" className="text-blue-600 underline">+91-9528500500</a> (10:00 am–7:00 pm IST; 6 days a week), or email <a href="mailto:info@nationalplastic.com" className="text-blue-600 underline">info@nationalplastic.com</a>.
          </li>
        </ul>
      </section>

      {/* Cancellation Policy */}
      <section>
        <h2 className="text-2xl font-medium mb-4">Cancellation Policy</h2>
        <p className="mb-4">
          If you change your mind after placing an order, you can cancel the order (or part of the order) within <strong>24 hours of order confirmation</strong> or before it is shipped, whichever is earlier. In case you wish to cancel the order post-dispatch, cancellation charges will be applicable.
        </p>
        <p>
          We are currently accepting B2B and B2C orders.
        </p>
      </section>
    </main>
  );
}
