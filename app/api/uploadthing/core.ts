import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

import { auth } from '@clerk/nextjs/server';

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const { userId: clerkId } = await auth();

      if (!clerkId) throw new UploadThingError('Unauthorized');

      return { clerkId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for clerkId:', metadata.clerkId);

      console.log('file url', file.url);

      return { uploadedBy: metadata.clerkId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
