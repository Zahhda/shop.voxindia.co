if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
  console.error("❌ Missing Cashfree ENV Vars:", {
    CASHFREE_CLIENT_ID,
    CASHFREE_CLIENT_SECRET,
  });
  return NextResponse.json(
    { error: "Missing ENV", debug: { id: CASHFREE_CLIENT_ID, secret: CASHFREE_CLIENT_SECRET } },
    { status: 500 }
  );
}
