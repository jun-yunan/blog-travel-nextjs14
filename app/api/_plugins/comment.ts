import { Elysia, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import fs from 'fs';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const comment = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET_JWT!,
    }),
  )
  .group('/comments', (app) =>
    app
      .post(
        '/:blogId',
        async ({ error, request, params }) => {
          try {
            const data = await request.formData();

            const content = data.get('content') as string;

            const { blogId } = params;

            if (!content || !blogId) {
              return error(400, 'Missing content or blogId');
            }

            const fileImage: File | null = data.get('image') as unknown as File;

            // const identity = await jwt.verify(auth.value);
            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: {
                clerkId,
              },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            let secure_url: string | undefined;

            if (fileImage && fileImage.size > 0) {
              if (!fileImage.type.includes('image')) {
                return error(400, 'Invalid file type');
              }
              if (fileImage.size > 5000000) {
                return error(400, 'File size too large');
              }

              const bytes = await fileImage.arrayBuffer();

              const buffer = new Uint8Array(bytes);

              // const pathImage = path.join(
              //   `${process.cwd()}`,
              //   'tmp',
              //   `${user.id}-${blogId}-${uuidv4()}.jpg`,
              // );

              const pathImage = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${
                user.id
              }-${blogId}-${uuidv4()}.jpg`;

              fs.writeFileSync(pathImage, buffer);

              const upload = await cloudinary.v2.uploader.upload(pathImage, {
                folder: 'comments',
                use_filename: true,
              });

              if (!upload) {
                return error(500, 'Failed to upload image');
              }

              fs.unlinkSync(pathImage);

              secure_url = upload.secure_url;
            }

            const comment = await db.comment.create({
              data: {
                content,
                imageUrl: !!secure_url ? secure_url : undefined,
                blog: {
                  connect: {
                    id: blogId,
                  },
                },
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            });

            if (!comment) {
              return error(500, 'Failed to create comment');
            }

            return {
              content,
              secure_url,
              comment,
            };
          } catch (err) {
            console.log(err);
            error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ blogId: t.String() }),
        },
      )
      .delete(
        '/:commentId',
        async ({ error, params }) => {
          try {
            const { commentId } = params;

            if (!commentId) {
              return error(400, 'Missing commentId');
            }

            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: {
                clerkId,
              },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            const comment = await db.comment.findUnique({
              where: {
                id: commentId,
              },
            });

            if (!comment) {
              return error(404, 'Comment not found');
            }

            const deletedComment = await db.comment.delete({
              where: {
                id: comment.id,
              },
            });

            if (!deletedComment) {
              return error(500, 'Failed to delete comment');
            }

            return {
              comment,
              deletedComment,
              status: 'deleted',
            };
          } catch (err) {
            console.log(err);
            return error(500, 'Internal Server Error');
          }
        },
        {
          params: t.Object({ commentId: t.String() }),
        },
      ),
  );
