// app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { OtpCode } from '@/models/OtpCode';
import twilio from 'twilio';

export async function POST(request: Request) {
  const { phone } = await request.json();
  console.log("phone--->", phone);

  if (!phone) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  await connectDB();

  const formatted = phone.startsWith('+') ? phone : `+${phone}`;
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await OtpCode.create({ phone: formatted, code });

  // Move Twilio client init here
  const twilioClient = twilio(
    process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID!,
    process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN!
  );
  try {
    await twilioClient.messages.create({
      to: formatted,
      from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER!,
      body: `Your verification code is: ${code}`
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Twilio error:', err,twilioClient);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}
