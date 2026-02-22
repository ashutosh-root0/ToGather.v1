import { auth } from "@workspace/auth/auth";

export const GET = auth.handler;
export const POST = auth.handler;

// To make the below code work i have to install better-auth in this project aswell however the above approach works fine aswell
// import { auth } from "@/lib/auth"; // path to your auth file
// import { toNextJsHandler } from "better-auth/next-js";

// export const { POST, GET } = toNextJsHandler(auth);


// /api/auth/sign-in
// /api/auth/sign-up
// /api/auth/get-session