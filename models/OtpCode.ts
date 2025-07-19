// models/OtpCode.ts
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, index: true },
  code:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true }
});

// Auto-delete 600 s (10 min) after `createdAt`
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export const OtpCode = mongoose.models.OtpCode || mongoose.model('OtpCode', otpSchema);
