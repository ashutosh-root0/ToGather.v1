// Utility to check Current Profile

import { auth } from "@workspace/auth/auth";
import { prisma } from "@workspace/database";
import { headers } from "next/headers";

export const currentProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return profile;
};