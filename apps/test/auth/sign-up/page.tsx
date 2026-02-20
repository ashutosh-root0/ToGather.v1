import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <div className="flex gap-2">
          <Button>Sign Up</Button>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link href="/auth/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
