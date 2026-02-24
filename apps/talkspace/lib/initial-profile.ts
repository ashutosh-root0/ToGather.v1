import { auth } from "@workspace/auth/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@workspace/database";

export const initialProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If no session, send them to login
  if (!session || !session.user) {
    return redirect("/auth/sign-in"); 
  }

  // Fetch the user from the DB using the session ID
  // We use findUnique because Better Auth already created this row
  const profile = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  // If for some reason the database record is missing but session exists
  if (!profile) {
     return redirect("/auth/sign-in");
  }

  return profile;
};

