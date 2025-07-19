"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function SignUpModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { login } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = async () => {
    setServerError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        // Clone then parse
        const clone = res.clone()
        let msg: string
        try {
          const errJson = await clone.json()
          msg = errJson.error || JSON.stringify(errJson)
        } catch {
          msg = await res.text()
        }
        throw new Error(msg || res.statusText)
      }

      // Get the user data from the response
      const userData = await res.json()

      // Login the user using the auth context
      login({
        name: formData.name,
        email: formData.email,
        // Include any other user data returned from the API
      })

      onClose()
    } catch (err: any) {
      console.error("Signup error:", err)
      setServerError(err.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Create an Account</CardTitle>
        <CardDescription>Enter your information to create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
            aria-invalid={!!errors.password}
          />
          {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
        </div>

        {serverError && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <Button className="w-full" onClick={handleSignup} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" className="p-0 h-auto" onClick={() => alert("Switch to signin")}>
            Sign in
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
