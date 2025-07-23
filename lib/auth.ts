// import type { NextAuthOptions } from "next-auth"
// import type { JWT } from "next-auth/jwt"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { createClient } from "@supabase/supabase-js"

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
// const supabase = createClient(supabaseUrl, supabaseKey)

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null
//         }

//         try {
//           const { data, error } = await supabase.auth.signInWithPassword({
//             email: credentials.email,
//             password: credentials.password,
//           })

//           if (error || !data.user) {
//             return null
//           }

//           // Get additional user data from your users table
//           const { data: userData, error: userError } = await supabase
//             .from("users")
//             .select("*")
//             .eq("id", data.user.id)
//             .single()

//           if (userError || !userData) {
//             return null
//           }

//           return {
//             id: data.user.id,
//             email: data.user.email,
//             name: userData.name,
//             role: userData.role,
//           }
//         } catch (error) {
//           console.error("Auth error:", error)
//           return null
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user: any }) {
//       if (user) {
//         token.id = user.id
//         token.email = user.email
//         token.name = user.name
//         token.role = user.role
//       }
//       return token
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.email = token.email
//         session.user.name = token.name
//         session.user.role = token.role
//       }
//       return session
//     },
//   },
//   pages: {
//     signIn: "/login",
//     error: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
//   cookies: {
//     sessionToken: {
//       name: `__Secure-next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: true,
//       },
//     },
//   },
// }
