import mongoose from 'mongoose';

const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI!;
if (!NEXT_PUBLIC_MONGODB_URI) throw new Error(`Please define the NEXT_PUBLIC_MONGODB_URI :${process.env.NEXT_PUBLIC_MONGODB_URI}`);

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) {
    console.log('[MongoDB] Using cached connection');          // ← cached
    return cached.conn;
  }

  console.log('[MongoDB] No cached connection, creating new one');  
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(NEXT_PUBLIC_MONGODB_URI)
      .then((mongooseInstance) => {
        console.log('[MongoDB] Connected');                      // ← on success
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('[MongoDB] Connection error:', err);       // ← on error
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
