"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, X } from "lucide-react"
import Image from "next/image"

type AuthModalProps = { onClose: () => void }

const DEV_USER = {
  _id: { $oid: "681519ec9f271ecf154987a3" },
  name: "Guest",
  email: "919582044111@phone.local",
  provider: "credentials",
  phone: "+919582044111",
  createdAt: { $date: { $numberLong: "1746561422264" } },
  updatedAt: { $date: { $numberLong: "1746561422264" } },
  __v: { $numberInt: "0" },
  token: "fake-jwt-token"
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState("+91")
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const { login } = useAuth()
  const isBypass = process.env.NEXT_PUBLIC_BYPASS_OTP === "true";

  // Auto-submit OTP when 6 digits are entered
  useEffect(() => {
    const otpValue = otp.join("")
    if (otpValue.length === 6 && otp.every(d => /^\d$/.test(d))) {
      handleVerifyOtp()
    }
  }, [otp])
  const countries = [
    { code: "+91", flag: "🇮🇳" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+61", flag: "🇦🇺" },
    { code: "+86", flag: "🇨🇳" },
    { code: "+49", flag: "🇩🇪" },
    { code: "+33", flag: "🇫🇷" },
    { code: "+81", flag: "🇯🇵" },
  ]
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isBypass) {
      setOtpSent(true)
      return
    }
    if (!phoneNumber) {
      setError("Please enter a valid phone number")
      return
    }
    setError(null)
    setLoading(true)
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhoneNumber }),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to send verification code")
      }
      setOtpSent(true)
    } catch (err: any) {
      console.error("OTP error:", err)
      setError(err.message || "Failed to send verification code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Refactored verify logic into standalone function so we can call from effect
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (isBypass) {
      login({
        id: DEV_USER._id.$oid,
        name: DEV_USER.name,
        email: DEV_USER.email,
        phone: DEV_USER.phone,
        image: "", addressLine1: "", addressLine2: "",
      })
      onClose()
      return
    }
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter the complete verification code")
      return
    }
    setError(null)
    setLoading(true)
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhoneNumber, otp: otpValue, name: name || "Guest" }),
      })
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to verify code")
      }
      const userData = await res.json()
      if (userData.token) localStorage.setItem("token", userData.token)
      login({
        id: userData.id, name: userData.name, email: userData.email || "",
        phone: userData.phone, image: userData.image,
        addressLine1: userData.addressLine1, addressLine2: userData.addressLine2,
      })
      onClose()
    } catch (err: any) {
      console.error("OTP verification error:", err)
      setError(err.message || "Invalid verification code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

   const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        document.querySelector<HTMLInputElement>(`input[name=\`otp-${index - 1}\`]`)?.focus()
      } else if (otp[index]) {
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").trim()
    if (/^\d{1,6}$/.test(pastedData)) {
      const newOtp = [...otp]
      pastedData.split("").forEach((d, i) => { newOtp[i] = d })
      setOtp(newOtp)
      const focusIndex = pastedData.length === 6 ? 5 : pastedData.length
      document.querySelector<HTMLInputElement>(`input[name=\`otp-${focusIndex}\`]`)?.focus()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg mx-auto overflow-hidden max-h-full sm:max-h-auto"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
          exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl shadow-2xl bg-white p-4 sm:p-6 max-w-full w-full transform transition-all duration-300">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-200"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={otpSent ? "otp" : "phone"}
                initial={{ opacity: 0, x: otpSent ? -20 : 20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, x: otpSent ? 20 : -20, transition: { duration: 0.2 } }}
              >
                {/* Phone Input Form */}
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 sm:space-y-6">
                    <div className="text-center space-y-2">
                      <div className="mx-auto  p-4 rounded-full">
                        {/* <div className="bg-green-500 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-white" />
                      </div> */}
                        <div className="flex items-center justify-center space-x-2">
                          <Image src="/logo-vox.svg" alt="Linerio Logo" width={80} height={32} />
                          <span className="sr-only">Vox</span>
                        </div>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Enter Phone Number</h2>
                      <p className="text-xs sm:text-sm text-gray-500">
                        We'll send a verification code to{" "}
                        <span className="font-medium text-gray-700">
                          {phoneNumber ? `${countryCode} ${phoneNumber}` : "your number"}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-row items-center gap-2 sm:gap-3 w-full">
                      {/* <div className="flex-[0_0_30%] sm:flex-[0_0_25%]"> */}
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-[30%] border border-gray-200 rounded-lg px-2 py-2 sm:px-3 sm:py-3 bg-white shadow-sm focus:border-green-500 focus:outline-none"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                      {/* </div> */}

                      {/* <div className="relative flex-[1_1_70%] sm:flex-[1_1_75%]"> */}
                      <input
                        type="tel"
                        placeholder="123 4567 8901"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        className="w-full border border-gray-200 rounded-lg py-2 px-3 sm:py-3 sm:px-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none shadow-sm"
                        autoFocus
                      />
                      {/* {phoneNumber && (
                          <button
                            type="button"
                            onClick={() => setPhoneNumber('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div> */}
                    </div>

                    <input
                      type="text"
                      placeholder="Your Name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg py-3 px-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none shadow-sm"
                    />

                    {error && (
                      <div className="flex items-start bg-red-50 p-3 rounded-lg">
                        <span className="mr-2 text-red-500">⚠️</span>
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !phoneNumber}
                      className="w-full py-3 font-medium rounded-lg bg-red-500 text-white shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-200"
                    >
                      {loading ? "Sending..." : "Send Code"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="text-center space-y-2">
                      <div className="mx-auto  p-4 rounded-full">
                        {/* <div className="bg-green-500 p-3 rounded-full">
                          <Shield className="h-6 w-6 text-white" />
                        </div> */}
                        <div className="flex items-center justify-center space-x-2">
                          <Image src="/logo-vox.svg" alt="Linerio Logo" width={80} height={32} />
                          <span className="sr-only">Vox</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-800">Enter Verification Code</h2>
                      <p className="text-sm text-gray-500">
                        Enter the 6-digit code sent to{" "}
                        <span className="font-medium text-gray-700">
                          {countryCode} {phoneNumber}
                        </span>
                      </p>
                    </div>

                   <div className="flex justify-center gap-2">
  {otp.map((digit, idx) => (
    <input
      key={idx}
      name={`otp-${idx}`}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      onChange={(e) => handleOtpChange(idx, e.target.value)}
      onKeyDown={(e) => handleKeyDown(idx, e)}
      onPaste={handlePaste}
      className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  ))}
</div>

                    {error && (
                      <div className="flex items-start bg-red-50 p-3 rounded-lg">
                        <span className="mr-2 text-red-500">⚠️</span>
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <button
                        type="submit"
                        disabled={loading || otp.join("").length !== 6}
                        className="w-full py-3 font-medium rounded-lg bg-green-500 text-white shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        {loading ? "Verifying..." : "Verify Code"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false)
                          setOtp(["", "", "", "", "", ""])
                          setError(null)
                        }}
                        className="flex items-center justify-center gap-1 py-2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
                      >
                        <ArrowLeft size={16} /> Back to Phone
                      </button>
                    </div>

                    <p className="text-xs text-center text-gray-500">
                      Didn\'t receive the code?{" "}
                      <button
                        type="button"
                        className="font-medium text-green-600 hover:text-green-700 focus:outline-none"
                        onClick={() => {
                          setOtpSent(false)
                          setOtp(["", "", "", "", "", ""])
                          setError(null)
                        }}
                      >
                        Resend
                      </button>
                    </p>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
