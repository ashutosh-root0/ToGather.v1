import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@workspace/auth/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if(!session) {
        return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    const { pathname } = request.nextUrl;

    // Handle Public Routes (like UploadThing)
    // We explicitly allow this so the UploadThing callback works
    if (pathname.startsWith("/api/uploadthing")) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile"], // Specify the routes the middleware applies to
};