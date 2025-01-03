import { Elysia, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { v4 as uuidv4 } from 'uuid';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const user = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET_JWT!,
    }),
  )
  .group('/users', (app) =>
    app
      .get(
        '/:userId',
        async ({ error, params }) => {
          try {
            const { userId } = params;
            if (!userId) {
              return error(400, 'Missing userId');
            }

            const { userId: identity } = await auth();
            if (!identity) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: { id: userId },
            });
            if (!user) {
              return error(404, 'User not found');
            }
            return user;
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ userId: t.String() }),
        },
      )
      .get('/me', async ({ error }) => {
        try {
          const { userId: clerkId } = await auth();

          if (!clerkId) {
            return error(401, 'Unauthorized');
          }

          const user = await db.user.findUnique({
            where: { clerkId },
          });

          if (!user) {
            return error(404, 'User not found');
          }

          return user;
        } catch (err) {
          console.log(err);

          return error(500, "Something's wrong");
        }
      })
      .post('/me/update-avatar', async ({ error, request }) => {
        try {
          const data = await request.formData();
          const file: File | null = data.get('image') as unknown as File;

          if (!file || file.size === 0) {
            return error(400, 'Missing image');
          }

          const { userId } = await auth();

          if (!userId) {
            return error(401, 'Unauthorized');
          }

          const currentUser = await db.user.findUnique({
            where: { clerkId: userId },
          });

          if (!currentUser) {
            return error(404, 'User not found');
          }

          const bytes = await file.arrayBuffer();

          const filePath = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${currentUser.id}-${uuidv4()}.png`;

          await fs.writeFile(filePath, new Uint8Array(bytes));

          const upload = await cloudinary.v2.uploader.upload(filePath, {
            folder: 'avatars',
            use_filename: true,
          });

          if (!upload) {
            return error(500, 'Upload failed');
          }

          await fs.unlink(filePath);

          const user = await db.user.update({
            where: { id: currentUser.id },
            data: {
              imageUrl: upload.secure_url,
            },
          });
          if (!user) {
            return error(500, 'Update failed');
          }

          return { status: 'success', url: upload.secure_url, user, bytes };
        } catch (err) {
          console.log(err);
          return error(500, "Something's wrong");
        }
      })
      // .put(
      //   '/me/update-password',
      //   async ({ body, jwt, cookie: { auth }, error }) => {
      //     try {
      //       const { oldPassword, newPassword } = body;

      //       if (!oldPassword || !newPassword) {
      //         return error(400, 'Missing oldPassword or newPassword');
      //       }

      //       const identity = await jwt.verify(auth.value);

      //       if (!identity) {
      //         return error(401, 'Unauthorized');
      //       }

      //       const user = await db.user.findUnique({
      //         where: { id: identity.id as string },
      //       });

      //       if (!user) {
      //         return error(404, 'User not found');
      //       }

      //       const correctPassword = await bcrypt.compare(
      //         oldPassword,
      //         user.password,
      //       );

      //       if (!correctPassword) {
      //         return error(401, 'Incorrect old password');
      //       }

      //       if (oldPassword === newPassword) {
      //         return error(
      //           400,
      //           'New password must be different from old password',
      //         );
      //       }

      //       const hashNewPassword = await bcrypt.hash(newPassword, 10);

      //       const updatedUser = await db.user.update({
      //         where: { id: identity.id as string },
      //         data: {
      //           password: hashNewPassword,
      //         },
      //       });

      //       if (!updatedUser) {
      //         return error(500, 'Update failed');
      //       }

      //       return { status: 'success', user: updatedUser };
      //     } catch (err) {
      //       console.log(err);

      //       return error(500, "Something's wrong");
      //     }
      //   },
      //   {
      //     body: t.Object({
      //       oldPassword: t.String(),
      //       newPassword: t.String(),
      //     }),
      //   },
      // )
      .get(
        '/check-username',
        async ({ query, error }) => {
          try {
            const { userId, username } = query;
            if (!userId || !username) {
              return error(400, 'Missing userId or username');
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

            const usernameExists = await db.user.findFirst({
              where: {
                username,
              },
            });

            if (usernameExists && usernameExists.id !== user.id) {
              return error(400, 'Username already exists');
            }

            return { status: 'success', query };
          } catch (err) {
            return error(500, "Something's wrong");
          }
        },
        {
          query: t.Object({
            username: t.String(),
            userId: t.String(),
          }),
        },
      )
      .put(
        '/:userId',
        async ({ error, params, body }) => {
          try {
            const { userId } = params;

            if (!userId) {
              return error(400, 'Missing userId');
            }

            const {
              bio,
              dateOfBirth,
              email,
              location,
              name,
              personalWebsite,
              username,
            } = body;

            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const existingUser = await db.user.findUnique({
              where: { id: userId },
            });

            if (!existingUser) {
              return error(404, 'User not found');
            }

            if (username) {
              const usernameExists = await db.user.findFirst({
                where: {
                  username,
                },
              });

              if (usernameExists && usernameExists.id !== userId) {
                return error(400, 'Username already exists');
              }
            }

            const user = await db.user.update({
              where: { id: userId },
              data: {
                username,
                email,
                name,
                location,
                bio,
                personalWebsite,
                dateOfBirth,
              },
            });
            if (!user) {
              return error(500, 'Update failed');
            }
            return {
              status: 'success',
              user,
            };
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ userId: t.String() }),
          body: t.Object({
            username: t.Optional(t.String()),
            email: t.Optional(t.String()),
            name: t.Optional(t.String()),
            location: t.Optional(t.String()),
            bio: t.Optional(t.String()),
            personalWebsite: t.Optional(t.String()),
            dateOfBirth: t.Optional(t.Date()),
          }),
        },
      )
      .get('/me/blogs', async ({ error }) => {
        try {
          const { userId: clerkId } = await auth();

          if (!clerkId) {
            return error(401, 'Unauthorized');
          }

          const user = await db.user.findUnique({
            where: { clerkId },
          });

          if (!user) {
            return error(404, 'User not found');
          }

          const blogs = await db.blog.findMany({
            where: {
              authorId: user.id,
            },
            include: {
              author: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          });

          if (!blogs || blogs.length === 0) {
            return error(404, 'Blogs not found');
          }

          return blogs;
        } catch (err) {
          console.log(err);
          return error(500, "Something's wrong");
        }
      })
      .get(
        '/user-by-username/:username',
        async ({ error, params }) => {
          try {
            const { username } = params;

            if (!username) {
              return error(400, 'Missing username');
            }

            const user = await db.user.findUnique({
              where: { username },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            return user;
          } catch (err) {
            console.log(err);
            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ username: t.String() }),
        },
      )
      .get(
        '/blogs-by-username/:username',
        async ({ error, params }) => {
          try {
            const { username } = params;
            if (!username) {
              return error(400, 'Missing username');
            }

            const user = await db.user.findUnique({
              where: { username },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            const blogs = await db.blog.findMany({
              where: {
                authorId: user.id,
              },
              include: {
                author: true,
                comments: {
                  include: {
                    blog: true,
                    user: true,
                  },
                },
                likes: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            });

            if (!blogs || blogs.length === 0) {
              return error(404, 'Blogs not found');
            }

            return blogs;
          } catch (err) {
            console.log(err);
            return error(500, "Something's wrong");
          }
        },
        { params: t.Object({ username: t.String() }) },
      )
      .get(
        '/blogs/:authorId',
        async ({ error, params }) => {
          try {
            const { authorId } = params;

            if (!authorId) {
              return error(400, 'Missing authorId');
            }

            const author = await db.user.findUnique({
              where: { id: authorId },
              include: {
                blogs: true,
                comments: true,
                likes: true,
              },
            });

            if (!author) {
              return error(404, 'Author not found');
            }

            const blogs = await db.blog.findMany({
              where: {
                authorId,
              },
              include: {
                author: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            });

            if (!blogs || blogs.length === 0) {
              return error(404, 'Blogs not found');
            }

            return blogs;
          } catch (err) {
            console.log(err);
            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ authorId: t.String() }),
        },
      ),
  );
