// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { OtpCode } from "@/models/OtpCode";
import { User } from "@/models/User";
import { MongoServerError } from "mongodb";
import * as jwt from "jsonwebtoken";

export async function POST(request: Request) {
  // lib/jwt.ts
  const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
  const JWT_ALGORITHM = "HS256";

  try {
    const { phone, otp, name = "Guest" } = await request.json();
    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    await connectDB();

    const formatted = phone.startsWith("+") ? phone : `+${phone}`;
    const record = await OtpCode.findOne({ phone: formatted, code: otp });
    if (!record) {
      console.log("🚀 ~ POST ~ record:", record)
      return NextResponse.json({ error: "Invalid or expired code" }, { status: 404 });
    }

    // find or create user
    let user = await User.findOne({ phone: formatted });
    if (!user) {
      const syntheticEmail = `${formatted.replace(/[^0-9]/g, "")}@voxindia.guest`;
      try {
        user = await User.create({
          phone: formatted,
          name,
          provider: "credentials",
          email: syntheticEmail,
        });
      } catch (err: any) {
        if (
          err instanceof MongoServerError &&
          err.code === 11000 &&
          (err.keyPattern?.phone || err.keyPattern?.email)
        ) {
          user = await User.findOne({ phone: formatted })!;
        } else {
          throw err;
        }
      }
    }

    await OtpCode.deleteMany({ phone: formatted });

    // sign with the shared secret & algorithm, and force id to string
    const token = jwt.sign(
      { id: user._id.toString(), phone: user.phone },
      NEXT_PUBLIC_JWT_SECRET,
      { algorithm: JWT_ALGORITHM, expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        token,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[verify-otp] Unhandled error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
