import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { totalAmount } = await req.json();

    if (!totalAmount) {
      return NextResponse.json({ error: "Missing amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    return NextResponse.json(order); // Will return {id, amount, currency, ...}
  } catch (err: any) {
    console.error("❌ Razorpay Order Error:", err);
    return NextResponse.json({ error: "Razorpay order failed", message: err.message }, { status: 500 });
  }
}
