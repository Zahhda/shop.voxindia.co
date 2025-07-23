"use client"

import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"

export default function FailurePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
      <XCircle className="text-red-600 w-16 h-16 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed</h1>
      <p className="text-lg text-gray-600 mb-8">
        We encountered an issue while processing your payment. Please try again later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-medium"
        >
          Go to Home
        </button>
        <button
          onClick={() => router.push("/checkout")}
          className="px-6 py-3 rounded-lg bg-black text-white text-lg font-medium hover:opacity-90"
        >
          Retry Payment
        </button>
      </div>
    </div>
  )
}
