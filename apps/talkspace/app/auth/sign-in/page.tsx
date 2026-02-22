import { ReturnButton } from "@/components/return-button"
import { SignInForm } from "./sign-in-form"

export default function SignInPage() {
  return (
    <div className="relative min-h-svh">

      {/* Top-left Return Button */}
      <div className="absolute top-4 left-4">
        <ReturnButton href="/" label="Back to home" />
      </div>
      <div className="flex items-center justify-center min-h-svh p-4">
        <SignInForm />
      </div>
    </div>
  )
}