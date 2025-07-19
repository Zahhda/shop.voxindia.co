import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { User } from "@/models/User"
import mongoose from "mongoose"

export async function PUT(request: NextRequest, { params }: { params: { id: string; addressId: string } }) {
  await connectDB()
  const { id, addressId } = params

  // Validate the IDs before using
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(addressId)) {
    return NextResponse.json({ error: "Invalid user or address ID format" }, { status: 400 })
  }

  try {
    const body = await request.json()

    // Ensure request body is an object
    if (typeof body !== "object" || Array.isArray(body) || body === null) {
      return NextResponse.json({ error: "Invalid request body format" }, { status: 400 })
    }

    // Construct the update object
    const update: Record<string, any> = {}
    Object.entries(body).forEach(([key, value]) => {
      update[`addresses.$.${key}`] = value
    })

    const user = await User.findOneAndUpdate({ _id: id, "addresses._id": addressId }, { $set: update }, { new: true })

    if (!user) {
      return NextResponse.json({ error: "User or address not found" }, { status: 404 })
    }

    return NextResponse.json(user.addresses, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string; addressId: string } }) {
  await connectDB()
  const { id, addressId } = params

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(addressId)) {
    return NextResponse.json({ error: "Invalid user or address ID format" }, { status: 400 })
  }

  try {
    const user = await User.findByIdAndUpdate(id, { $pull: { addresses: { _id: addressId } } }, { new: true })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user.addresses, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 })
  }
}
