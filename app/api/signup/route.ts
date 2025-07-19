import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Name, email and password are required.' },
      { status: 400 }
    );
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: 'User already exists.' },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashed,
    provider: 'credentials',
    image: '',
  });

  return NextResponse.json(
    { message: 'User created successfully.' },
    { status: 201 }
  );
}
