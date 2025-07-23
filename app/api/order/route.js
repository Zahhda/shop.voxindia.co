// app/api/send-mail/route.js
import { sendMail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { customerEmail, orderSummary, customerName } = body;

  // Build HTML message for admin
  const adminMessage = `
    <h2>🛒 New Order Received</h2>
    <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
    <p><strong>Order Summary:</strong></p>
    <pre>${JSON.stringify(orderSummary, null, 2)}</pre>
  `;

  // Build HTML message for customer
  const customerMessage = `
    <h2>✅ Order Confirmed</h2>
    <p>Hi ${customerName},</p>
    <p>Thank you for your order! We’ve received it and will process it shortly.</p>
    <p><strong>Your order summary:</strong></p>
    <pre>${JSON.stringify(orderSummary, null, 2)}</pre>
    <p>Regards,<br/>QuickCart Team</p>
  `;

  try {
    // Send to admin
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: "📦 New Order Received - QuickCart",
      html: adminMessage,
    });

    // Send to customer
    await sendMail({
      to: customerEmail,
      subject: "🧾 Your Order Confirmation - QuickCart",
      html: customerMessage,
    });

    return NextResponse.json({ success: true, message: "Emails sent" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error: "Email failed" }, { status: 500 });
  }
}
