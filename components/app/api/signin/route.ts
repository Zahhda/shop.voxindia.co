// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { User }      from '@/models/User';
import { hash }      from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();

    // Prevent duplicate emails
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Hash & save
    const hashed = await hash(password, 10);
    await User.create({ name, email, password: hashed, provider: 'credentials' });

    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
