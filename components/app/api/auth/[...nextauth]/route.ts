import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compare } from "bcryptjs"
import connectDB from "@/lib/mongodb"
import { User } from "@/models/User"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided")
        const { email, password } = credentials

        await connectDB()
        const user = await User.findOne({ email })
        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const valid = await compare(password, user.password)
        if (!valid) throw new Error("Invalid password")

        // Return all user data except password
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image || null,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account?.provider) {
        throw new Error("OAuth account missing provider")
      }

      await connectDB()
      const exists = await User.findOne({ email: user.email })

      if (!exists) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: account.provider,
        })
      }

      return true
    },
    async jwt({ token, user }) {
      // Add user ID to token when first created
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Add user ID from token to session
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

// This is the key part that creates the handler for all NextAuth routes
const handler = NextAuth(authOptions)

// Make sure to export the handler for both GET and POST methods
export { handler as GET, handler as POST }
