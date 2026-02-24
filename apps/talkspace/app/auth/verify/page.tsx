"use client"
 
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ReturnButton } from "@/components/return-button"
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
import { Mail, CheckCircle, AlertCircle, RefreshCw, MailCheck, ArrowLeft } from "lucide-react"
import Link from "next/link"
 
type VerificationStatus = "loading" | "success" | "error" | "expired" | "invalid"

interface VerifyPageProps {
  // In Next.js 16, searchParams is strictly a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  // Await the parameters before using them
  const resolvedParams = await searchParams;
  const error = resolvedParams.error as string;

  // Better Auth specific error mappings
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "token_expired":
        return "Your verification link has expired. Please log in to request a new one.";
      case "invalid_token":
        return "The verification token is invalid, malformed, or has already been used.";
      default:
        return "An unknown error occurred during email verification. Please try again.";
    }
  };

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

        <CardContent>
          {error ? (
            <Alert variant="destructive" className="mb-4">
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
              <p>
                If you don't see it, be sure to check your spam folder.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          {error ? (
            <Button asChild className="w-full">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Login
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}