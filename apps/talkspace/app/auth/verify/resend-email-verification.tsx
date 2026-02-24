"use client"

import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Loader2, Send } from "lucide-react"
import { authClient } from "@workspace/auth/auth-client"
import { toast } from "@workspace/ui/components/sonner"

export function ResendEmailForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.")
      return
    }

    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          setLoading(true)
        },
        onResponse: () => {
          setLoading(false)
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to resend verification email.")
        },
        onSuccess: () => {
          toast.success("Verification email resent! Please check your inbox.")
          setEmail("") // clear the input on success
        },
      }
    )
  }

  return (
    <form onSubmit={handleResendEmail} className="space-y-4 w-full">
      <div className="space-y-2 text-left">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Resend Verification Email
      </Button>
    </form>
  )
}