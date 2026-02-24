import { auth } from "@workspace/auth/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session || !session.user) {
    throw new UploadThingError("Unauthorized: You must be logged in to upload.");
  }

  // Return the user data so it passes down to onUploadComplete
  return { userId: session.user.id };
};

export const ourFileRouter = {
  
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware((async ({ req }) => {
      const user = await handleAuth(req);
      
      // Whatever you return here becomes the `metadata` in onUploadComplete
      return user; 
    }))
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      
      // The return value here is sent to your client-side onClientUploadComplete callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),

    messageFile: f(["image", "video", "pdf", "audio"])
    .middleware((async ({ req }) => {
      const user = await handleAuth(req);
      
      // Whatever you return here becomes the `metadata` in onUploadComplete
      return user; 
    }))
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      
      // The return value here is sent to your client-side onClientUploadComplete callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),

  // You can easily add more routes here using the same handleAuth function
  // documentUploader: f({ pdf: { maxFileSize: "16MB" } })
  //   .middleware(async ({ req }) => await handleAuth(req))
  //   .onUploadComplete(...)

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;