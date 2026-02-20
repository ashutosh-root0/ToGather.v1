import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { prisma } from "@workspace/database";

export default async function Page() {
  // Ensure user exists
  await prisma.test.upsert({
    where: { email: "sample@example.com" },
    update: {}, // Do nothing if already exists
    create: {
      email: "sample@example.com",
      name: "Sample User",
    },
  });

  // Fetch first user
  const user = await prisma.test.findFirst();

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>

        <div className="flex gap-2">
          <Button>Button</Button>

          <Button variant="outline">Outline</Button>

          <Link href="/auth/sign-in">
            <Button>Sign In</Button>
          </Link>

          <Link href="/auth/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>

        <div className="text-center">
          {user ? (
            <>
              <p className="font-semibold">User Found:</p>
              <p>Name: {user.name}</p>
            </>
          ) : (
            <p>No user found</p>
          )}
        </div>
      </div>
    </div>
  );
}