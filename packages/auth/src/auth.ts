import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@workspace/database";
import { sendEmailAction } from "./send-email.action.js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: false,
    requireEmailVerification: true,
  }, 
  emailVerification:{
    sendOnSignUp: true,
    expiresIn: 60*60,
    autoSignInAfterVerification: true,
    sendVerificationEmail : async({ user, url}) => {
      
      console.log('url before changing', url);
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");
      console.log('url after changing', link);

      await sendEmailAction({
        to: user.email,
        subject: "Verify your Email Address",
        meta: {
          description : "Please Verify your email address to complete your registeration.",
          link: String(link),
        }
      })
      
    }
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
  account: {
   accountLinking : {
    // Changed this to true to allow account linking (Default Value was true as well)
    enabled : true,
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