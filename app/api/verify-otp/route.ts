// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { OtpCode } from "@/models/OtpCode"
import { User } from "@/models/User"
import { MongoServerError } from "mongodb"
import * as jwt from "jsonwebtoken"
import { NEXT_PUBLIC_JWT_SECRET, JWT_ALGORITHM } from "@/lib/jwt"

export async function POST(request: Request) {
  const { phone, otp, name = "Guest" } = await request.json()
  if (!phone || !otp) {
    return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 })
  }

  await connectDB()
  const formatted = phone.startsWith("+") ? phone : `+${phone}`
  const record = await OtpCode.findOne({ phone: formatted, code: otp })
  if (!record) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 404 })
  }

  let user = await User.findOne({ phone: formatted })
  if (!user) {
    const syntheticEmail = `${formatted.replace(/[^0-9]/g, "")}@voxindia.guest`
    try {
      user = await User.create({
        phone: formatted,
        name,
        provider: "credentials",
        email: syntheticEmail,
      })
    } catch (err: any) {
      if (
        err instanceof MongoServerError &&
        err.code === 11000 &&
        (err.keyPattern?.phone || err.keyPattern?.email)
      ) {
        user = await User.findOne({ phone: formatted })!
      } else {
        throw err
      }
    }
  }

  await OtpCode.deleteMany({ phone: formatted })

  // — SIGN with the shared secret & algorithm
  const token = jwt.sign(
    { id: user._id.toString(), phone: user.phone },
    NEXT_PUBLIC_JWT_SECRET,
    { algorithm: JWT_ALGORITHM, expiresIn: "7d" }
  )

  return NextResponse.json(
    {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      addressLine1: user.addressLine1,
      addressLine2: user.addressLine2,
      token,            // <-- send it back
    },
    { status: 200 }
  )
}
