import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone,
      addressLine1, addressLine2, city, state, zip,
      cartItems, totalAmount, method,
    } = body;

    // 💡 Validate environment
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

    if (!ADMIN_EMAIL || !GMAIL_APP_PASSWORD) {
      return NextResponse.json({ error: "Missing email credentials" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ADMIN_EMAIL,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const orderDetails = cartItems.map((item: any) => `
      <li>${item.productName} × ${item.quantity} — ₹${item.price * item.quantity}</li>
    `).join("");

    const htmlContent = `
      <h2>🧾 Thank you for your order, ${fullName}!</h2>
      <p><strong>Order Summary:</strong></p>
      <ul>${orderDetails}</ul>
      <p><strong>Total:</strong> ₹${totalAmount}</p>
      <p><strong>Payment Method:</strong> ${method}</p>
      <p><strong>Shipping Address:</strong><br/>
      ${addressLine1}, ${addressLine2}<br/>
      ${city}, ${state} - ${zip}<br/>
      📞 ${phone}</p>
      <p>We'll notify you once your order is shipped!</p>
    `;

    const mailOptions = {
      from: `Vox India Shop <${ADMIN_EMAIL}>`,
      to: [email, ADMIN_EMAIL],
      subject: "🛒 Your Order Confirmation - Vox India",
      text: `Thanks for your order, ${fullName}. Total ₹${totalAmount}.`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Email Error:", err);
    return NextResponse.json({ error: "Email failed to send", debug: err.message }, { status: 500 });
  }
}
