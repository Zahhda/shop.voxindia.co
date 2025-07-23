"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Phone, Shield, ArrowLeft } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Modal from "./Modal"

interface UserData {
  name: string
  email: string
  phone?: string
  addressLine1?: string
  addressLine2?: string
}

const ProfileForm: React.FC = () => {
  const { user, login } = useAuth()
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
  })
  const [originalData, setOriginalData] = useState<UserData>(formData)
  const [editing, setEditing] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])

  // Populate form when user loads
  useEffect(() => {
    if (user) {
      const email = user.email?.endsWith("@voxindia.guest")
        ? ""
        : user.email || ""
      const userData = {
        name: user.name || "",
        email,
        phone: user.phone || "",
        addressLine1: user.addressLine1 || "",
        addressLine2: user.addressLine2 || "",
      }
      setFormData(userData)
      setOriginalData(userData)
    }
  }, [user])
  useEffect(() => {
      const otpValue = otp.join("")
      if (otpValue.length === 6 && otp.every(d => /^\d$/.test(d))) {
        handleVerifyOtp()
      }
    }, [otp])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditClick = () => {
    if (!editing) {
      setError(null)
      setShowOtpModal(true)
    } else {
      // Cancel edits
      setEditing(false)
      setFormData(originalData)
      setError(null)
    }
  }

  const handleSendOtp = async () => {
    if (!user?.phone) {
      setError("No phone number associated with your account")
      return
    }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: user.phone }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to send OTP")
      }
      setOtpSent(true)
      toast({
        title: "Verification code sent",
        description: `We've sent a code to ${user.phone}`,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("")
    // if (otpValue.length !== 6) {
    //   setError("Please enter the 6-digit code")
    //   return
    // }
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: user?.phone,
          otp: otpValue,
          name: user?.name || "Guest",
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Failed to verify OTP")
      }
      const data = await res.json()
      // store and login
      if (data.token) localStorage.setItem("token", data.token)
      login({
        id: data.id,
        name: data.name,
        email: data.email || "",
        phone: data.phone,
        image: data.image,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
      })
      setEditing(true)
      setShowOtpModal(false)
      setOtp(["", "", "", "", "", ""])
      setOtpSent(false)
      toast({
        title: "Verified",
        description: "You can now edit your profile",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const submitProfileChanges = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        // pick singular error or join Zod validation messages
        const msg =
          err.error ||
          (err.errors
            ? Object.values(err.errors).flat().join(", ")
            : "Failed to update profile")
        throw new Error(msg)
      }
      const { data: updated } = await res.json()
      login({ ...user!, ...formData })
      setOriginalData(formData)
      setEditing(false)
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // const handleOtpChange = (i: number, v: string) => {
  //   if (!/^\d?$/.test(v)) return;
  //   const next = [...otp];
  //   next[i] = v;
  //   setOtp(next);
  
  //   // auto-focus logic
  //   if (v && i < 5) {
  //     const input = document.querySelector<HTMLInputElement>(
  //       `input[name="otp-${i + 1}"]`
  //     );
  //     input?.focus();
  //   }
  
  //   // AUTO-SUBMIT: as soon as all six are filled
  //   if (next.every((digit) => digit !== "")) {
  //     handleVerifyOtp();
  //   }
  // };
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
  

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      const prev = document.querySelector<HTMLInputElement>(
        `input[name="otp-${i - 1}"]`
      )
      prev?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const txt = e.clipboardData.getData("text").trim()
    if (/^\d{1,6}$/.test(txt)) {
      const arr = txt.split("").slice(0, 6)
      setOtp(arr.concat(Array(6 - arr.length).fill("")))
    }
  }

  const closeModal = () => {
    setShowOtpModal(false)
    setOtpSent(false)
    setOtp(["", "", "", "", "", ""])
    setError(null)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleEditClick}
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Form Fields */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" autoComplete="username" className="hidden" disabled />

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            disabled
            className="mt-1 w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Address Line 1</label>
          <input
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Address Line 2</label>
          <input
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 w-full border rounded p-2 disabled:bg-gray-100"
          />
        </div>
      </form>

      {/* Profile Update Error & Save */}
      {editing && !showOtpModal && (
        <div className="space-y-2">
          {error && (
            <div className="flex items-start bg-red-50 p-3 rounded-lg">
              <span className="mr-2 text-red-500">⚠️</span>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <button
            onClick={submitProfileChanges}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {/* OTP Modal */}
      <Modal show={showOtpModal} onClose={closeModal}>
        <div className="space-y-6">
          {!otpSent ? (
            <>
              <h2 className="text-2xl font-semibold text-center">Verify Your Identity</h2>
              <p className="text-center text-gray-600">
                We'll send a code to{" "}
                <span className="font-medium text-gray-800">{user?.phone}</span>
              </p>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full py-3 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-center">Enter OTP</h2>
              <div className="flex justify-center gap-2">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    name={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className="w-10 h-12 text-center text-xl border rounded"
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.join("").length !== 6}
                className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Enable Edit"}
              </button>
              <button
                onClick={() => {
                  setOtpSent(false)
                  setOtp(["", "", "", "", "", ""])
                  setError(null)
                }}
                className="w-full text-center text-gray-500 text-sm mt-2"
              >
                Resend or Back
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ProfileForm
