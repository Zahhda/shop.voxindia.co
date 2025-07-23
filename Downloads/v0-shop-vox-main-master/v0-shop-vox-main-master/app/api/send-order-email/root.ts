import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// This route handles POST requests to send an order confirmation email
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, fullName, phone, cartItems, totalAmount } = body;

  const {
    ADMIN_EMAIL,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REFRESH_TOKEN,
  } = process.env;

  if (!ADMIN_EMAIL || !GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
    return NextResponse.json({ error: "Email environment variables missing" }, { status: 500 });
  }

  // Set up nodemailer transport using Gmail OAuth2
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: `"Vox Store" <${ADMIN_EMAIL}>`,
    to: email,
    subject: "🧾 Order Confirmation - Vox Store",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
        <h2>Hello ${fullName},</h2>
        <p>Thank you for shopping at <strong>Vox Store</strong>! Your order has been received.</p>
        <hr />
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        <h3>🛒 Items Ordered:</h3>
        <ul>
          ${cartItems.map((item: any) => `<li>${item.name} × ${item.quantity}</li>`).join("")}
        </ul>
        <p>We'll notify you when your order is shipped. If you have any questions, feel free to reply to this email.</p>
        <p>Cheers,<br /><strong>Team Vox</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
