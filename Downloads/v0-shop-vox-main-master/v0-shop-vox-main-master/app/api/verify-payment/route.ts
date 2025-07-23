import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
  }

  const { CASHFREE_CLIENT_ID, CASHFREE_CLIENT_SECRET } = process.env;

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing Cashfree keys" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": CASHFREE_CLIENT_ID,
        "x-client-secret": CASHFREE_CLIENT_SECRET,
        "x-api-version": "2022-09-01",
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Cashfree status error:", result);
      return NextResponse.json({ error: "Cashfree query failed", details: result }, { status: 500 });
    }

    return NextResponse.json({
      order_id: result.order_id,
      order_status: result.order_status,
      payment_info: result.payment_instruments,
    });
  } catch (err) {
    console.error("Server error verifying payment:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
