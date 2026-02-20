import { prisma } from "@workspace/database";

export default async function Home() {
  // Push a sample user 
  await prisma.user.upsert({
    where: { email: "sample@example.com" },
    update: {}, // do nothing if already exists
    create: {
      email: "sample@example.com",
      name: "Sample User",
    },
  });

  const user = await prisma.user.findFirst();

  return (
    <div>
      {user?.name ?? "No user added yet"}
    </div>
  );
}
