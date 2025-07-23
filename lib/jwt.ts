// lib/jwt.ts
export const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!
if (!NEXT_PUBLIC_JWT_SECRET) {
  throw new Error("Missing NEXT_PUBLIC_JWT_SECRET in env")
}
export const JWT_ALGORITHM = "HS256"
