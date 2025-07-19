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
    // Step 1: Authenticate
    const authRes = await fetch("https://api.cashfree.com/pg/v1/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CASHFREE_CLIENT_ID,
        client_secret: CASHFREE_CLIENT_SECRET,
      }),
    });

    const authData = await authRes.json();
    const token = authData.data.token;

    if (!token) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    // Step 2: Fetch order status
    const res = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, {
      method: "GET",
      headers: {
        "x-api-version": "2022-09-01",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Cashfree status error:", result);
      return NextResponse.json({ error: result.message || "Cashfree query failed" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
