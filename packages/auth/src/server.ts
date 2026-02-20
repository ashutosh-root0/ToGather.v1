import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import {prisma} from "@workspace/database";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  }, 
});

/*
maybe use this  just after provider }), 
pages : {
signIn : "/auth/sign-in",
signUp : "/auth/sign-up",
},
trustedOrigin : process.env.NODE_ENV === "production" ? [
process.env.APP1_URL,
process.env.APP2_URL,
].filter ((url) : url is string => Boolean(url)) : [
"http://localhost:3000",
"http://localhost:3001",
"http://localhost:3002",
"http://localhost:3003",
],
*/