import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@workspace/ui/components/card"
import { MailCheck, AlertCircle, ArrowLeft } from "lucide-react"

import { ResendEmailForm } from "./resend-email-verification"

// Next.js 16 strictly types searchParams as a Promise
interface VerifyPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  // Await the params to read the error query directly on the server
  const resolvedParams = await searchParams
  const error = resolvedParams.error as string | undefined

  // Better Auth specific error mappings
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "token_expired":
        return "Your verification link has expired. Please request a new one below."
      case "invalid_token":
        return "The verification token is invalid, malformed, or has already been used. Please request a new link."
      default:
        return "An unknown error occurred during email verification. Please try requesting a new link."
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {error ? (
              <AlertCircle className="h-6 w-6 text-destructive" />
            ) : (
              <MailCheck className="h-6 w-6 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {error ? "Verification Failed" : "Check your email"}
          </CardTitle>
          <CardDescription>
            {error
              ? "We couldn't verify your email address."
              : "We've sent a verification link to your email address."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{getErrorMessage(error)}</AlertDescription>
            </Alert>
          ) : (
            <div className="text-center text-sm text-muted-foreground space-y-4">
              <p>
                Please click the link in the email to verify your account. You will
                be automatically redirected to your dashboard once verified.
              </p>
              <p>If you don't see it, be sure to check your spam folder.</p>
            </div>
          )}

          {/* Render the Client Component form here */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-4 text-center">
              {error ? "Request a new verification link" : ""}
            </h3>
            <ResendEmailForm />
          </div>
        </CardContent>

        <CardFooter>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/auth/sign-up">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to SignUp
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}