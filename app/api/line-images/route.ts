import connectDB from "@/lib/mongodb"
import { LineImages } from "@/models/LineImages"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const lineImages = await LineImages.findOne({})

    if (!lineImages) {
      return NextResponse.json({ error: "No line images found" }, { status: 404 })
    }

    return NextResponse.json(lineImages)
  } catch (error) {
    console.error("[API] Error fetching line images:", error)
    return NextResponse.json({ error: "Failed to fetch line images" }, { status: 500 })
  }
}
