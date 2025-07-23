// app/api/user/route.ts
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken"
import { NEXT_PUBLIC_JWT_SECRET, JWT_ALGORITHM } from "@/lib/jwt"
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import { User } from "@/models/User";
import { MongoServerError } from "mongodb";

const ProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
});
// const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
// const JWT_ALGORITHM = "HS256";
// dummy
async function getUserFromRequest(request: Request) {
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/, "")
  if (!token) return null

  try {
    const payload = jwt.verify(token, NEXT_PUBLIC_JWT_SECRET, { algorithms: [JWT_ALGORITHM] }) as { id: string }
    await connectDB()
    return User.findById(payload.id)
  } catch (err) {
    console.error("JWT verification failed:", err)
    return null
  }
}

export async function PUT(request: Request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten() }, { status: 400 });
  }

  Object.assign(user, parsed.data);
  try {
    await user.save();
  } catch (err: any) {
    // If it’s a Mongo duplicate‐key error, surface the field:
    if (err instanceof MongoServerError && err.code === 11000) {
      // e.g. { email: "foo@bar.com" }
      const dupField = Object.keys(err.keyValue)[0];
      return NextResponse.json(
        { error: `${dupField.charAt(0).toUpperCase() + dupField.slice(1)} already exists` },
        { status: 409 }
      );
    }

    // Otherwise log and return a generic failure
    console.error("Error saving user:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update user" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
      },
    },
    { status: 200 }
  );
}


// PUT /api/user  — authenticated update
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
