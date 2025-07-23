import mongoose, { Schema } from "mongoose"

// Define the schema for line images
const LineImagesSchema = new Schema({
  lLine: [String],
  mLine: [String],
  sLine: [String],
})

// Create or retrieve the model
export const LineImages = mongoose.models.LineImages || mongoose.model("LineImages", LineImagesSchema)
