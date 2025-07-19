import { NextResponse } from "next/server";
import crypto from "crypto";

const CASHFREE_WEBHOOK_SECRET = process.env.CASHFREE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-webhook-signature") || "";
    const bodyText = await req.text();

    // Verify HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac("sha256", CASHFREE_WEBHOOK_SECRET)
      .update(bodyText)
      .digest("base64");

    if (signature !== expectedSignature) {
      console.warn("❌ Invalid webhook signature");
      return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 });
    }

    const body = JSON.parse(bodyText);
    const { order_id, order_status } = body;

    if (order_status === "PAID") {
      console.log("✅ Payment confirmed via webhook:", order_id);
      // TODO: Update DB, send email, etc.
    } else {
      console.warn("⚠️ Payment not completed. Status:", order_status);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ success: false, error: "Invalid webhook" }, { status: 400 });
  }
}
