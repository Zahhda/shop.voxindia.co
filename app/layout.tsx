import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
//good deploy
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linerio Slat Panels | Premium Wall & Ceiling Solutions",
  description:
    "Discover our premium slatted wall and ceiling panels made from 100% recyclable polystyrene. Lightweight, durable, and easy to install.",
  keywords:
    "wall panels, ceiling panels, slat panels, interior design, home decor, Linerio",
  generator: "v0.dev",
  icons: {
    icon: "/logo-vox.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
            </WishlistProvider>
          </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
