import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <div className="flex gap-2">
          <Button>Sign In</Button>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
