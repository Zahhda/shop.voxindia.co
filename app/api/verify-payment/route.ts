// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

    if (!RAZORPAY_SECRET) {
      return NextResponse.json({ error: "Missing Razorpay secret" }, { status: 500 });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    const generated_signature = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isValid = generated_signature === razorpay_signature;

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "Payment signature verified",
        payment_id: razorpay_payment_id,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Signature mismatch",
      }, { status: 400 });
    }
  } catch (err: any) {
    console.error("❌ Verification error:", err);
    return NextResponse.json({ error: "Server Error", message: err.message }, { status: 500 });
  }
}
