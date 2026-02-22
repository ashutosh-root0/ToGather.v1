"use client"

import { authClient } from "@workspace/auth/auth-client"
import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { useRouter } from "next/navigation"

export const SignOutButton = () => {

    const router = useRouter()
    
    async function handleClick() {
        await authClient.signOut({
            fetchOptions:{
                onSuccess: () => {
                    router.push("/auth/sign-in")
                },
                onError: (ctx) => {
                    toast.error("Sign out failed. Please try again.")
                    console.log(ctx.error.message)
                }
            }
        })
    }
    return (
        <Button onClick={handleClick} size="sm" variant="destructive">Sign out</Button>
    )
}