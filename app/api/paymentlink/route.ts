import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Missing Cashfree credentials" }, { status: 500 });
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
    const authRes = await fetch("https://api.cashfree.com/pg/v1/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const authData = await authRes.json();

    if (!authData?.data?.token) {
      console.error("❌ Auth failed:", authData);
      return NextResponse.json({ error: "Authentication failed", debug: authData }, { status: 401 });
    }

    const token = authData.data.token;

    // Step 2: Create order
    const orderRes = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      console.error("❌ Order creation failed:", orderData);
      return NextResponse.json({ error: orderData.message || "Order failed", debug: orderData }, { status: 400 });
    }

    return NextResponse.json(orderData);
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Internal Server Error", message: err.message }, { status: 500 });
  }
}