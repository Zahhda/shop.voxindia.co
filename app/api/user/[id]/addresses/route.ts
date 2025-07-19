import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { User } from "@/models/User"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const { id } = params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 })
  }

  try {
    const user = await User.findById(id).select("addresses")
    return NextResponse.json(user?.addresses || [], { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const { id } = params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 })
  }

  try {
    const body = await request.json()
    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    user.addresses.push(body)
    await user.save()

    return NextResponse.json(user.addresses, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
