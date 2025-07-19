import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID;
    const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET;

    if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
      console.error("❌ Missing Cashfree ENV Vars:", {
        id: CASHFREE_CLIENT_ID,
        secret: CASHFREE_CLIENT_SECRET,
      });

      return NextResponse.json(
        { error: "Missing ENV", debug: { id: CASHFREE_CLIENT_ID, secret: CASHFREE_CLIENT_SECRET } },
        { status: 500 }
      );
    }

    const order_id = "ORDER_" + Date.now();

    const payload = {
      order_id,
      order_amount: body.totalAmount,
      order_currency: "INR",
      order_note: "Payment for your purchase",
      customer_details: {
        customer_id: body.email,
        customer_email: body.email,
        customer_phone: body.phone,
        customer_name: body.fullName,
      },
      order_meta: {
        return_url: `https://shop.voxindia.co/checkout/success?order_id=${order_id}`,
        notify_url: `https://shop.voxindia.co/api/payment-webhook`,
      },
    };

    // Step 1: Authenticate
    console.log("⚠️ Cashfree ENV Vars:", {
  id: process.env.CASHFREE_CLIENT_ID,
  secret: process.env.CASHFREE_CLIENT_SECRET,
});
    const authRes = await fetch("https://api.cashfree.com/pg/v1/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CASHFREE_CLIENT_ID,
        client_secret: CASHFREE_CLIENT_SECRET,
      }),
    });

    const authData = await authRes.json();

    if (!authData?.data?.token) {
      console.error("❌ Auth failed:", authData);
      return NextResponse.json({ error: "Authentication failed", debug: authData }, { status: 401 });
    }

    const token = authData.data.token;

    // Step 2: Create payment order
    const res = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("❌ Cashfree order error:", result);
      return NextResponse.json({ error: result.message || "Order creation failed", debug: result }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("❌ Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
  }
}
