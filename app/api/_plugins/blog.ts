import { Elysia, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from 'cloudinary';
import fs from 'fs';
import { db } from '@/lib/db';
import { convertBase64ToImage } from '@/lib/convertBase64ToImage';
import { auth } from '@clerk/nextjs/server';
import slugify from 'slugify';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const blog = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET_JWT!,
    }),
  )
  .group('/blogs', (app) =>
    app
      .get(
        '/:blogId',
        async ({ error, params }) => {
          try {
            if (!params.blogId) {
              return error(400, 'Missing blogId');
            }

            const blog = db.blog.findUnique({
              where: { id: params.blogId },
              include: {
                author: true,
                comments: {
                  include: {
                    user: true,
                  },
                },
                likes: {
                  include: {
                    user: true,
                  },
                },
              },
            });

            if (!blog) {
              return error(404, 'Blog not found');
            }

            return blog;
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ blogId: t.String() }),
        },
      )
      .get(
        '/',
        async ({ error, query }) => {
          try {
            const { page } = query;

            const blogs = await db.blog.findMany({
              include: {
                author: true,
              },
              where: {
                published: true,
              },
              skip: page ? (Number(page) - 1) * 10 : 0,
              take: 10,
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
          query: t.Object({
            page: t.Optional(t.Number()),
          }),
        },
      )
      .get(
        `/search`,
        async ({ error, query }) => {
          try {
            const { q } = query;

            if (!q) {
              return error(400, 'Missing query');
            }

            const blogs = await db.blog.findMany({
              where: {
                OR: [
                  {
                    title: {
                      contains: q,
                    },
                  },
                  {
                    content: {
                      contains: q,
                    },
                  },
                ],
              },
              include: {
                author: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            });

            if (!blogs || blogs.length === 0) {
              return [];
            }

            return blogs;
          } catch (err) {
            return error(500, "Something's wrong");
          }
        },
        {
          query: t.Object({
            q: t.String(),
          }),
        },
      )
      .post(
        '/',
        async ({ body, error }) => {
          try {
            const { title, tags, content, published, coverImage } = body;

            const listTags: string[] = [];

            if (tags) {
              const tagsParse: string = JSON.parse(tags);
              tagsParse.split(',').map((tag) => listTags.push(tag.trim()));
            }

            if (!title || !content) {
              return error(400, 'Missing title, author or content');
            }

            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: { clerkId: clerkId },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            const contentParsed = JSON.parse(content);

            const base64Images: any[] = [];

            contentParsed.ops.forEach((op: any) => {
              if (
                op.insert &&
                op.insert.image &&
                op.insert.image.startsWith('data:image')
              ) {
                base64Images.push(op.insert.image);
              }
            });

            const outputFilePaths: string[] = [];

            if (base64Images.length !== 0) {
              base64Images.forEach((base64Image, index) => {
                const outputFilePath = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${
                  user.id
                }-${Date.now()}-${uuidv4()}.png`;
                convertBase64ToImage(base64Image, outputFilePath);
                outputFilePaths.push(outputFilePath);
              });
            }

            const imageUrls: string[] = [];

            if (outputFilePaths.length !== 0) {
              const cloudinaryPromises = outputFilePaths.map(
                (outputFilePath) => {
                  return cloudinary.v2.uploader.upload(outputFilePath, {
                    folder: 'blogs',
                    use_filename: true,
                  });
                },
              );

              const cloudinaryResults = await Promise.all(cloudinaryPromises);

              if (!cloudinaryResults) {
                return error(500, "Can't upload images to cloudinary");
              }

              outputFilePaths.forEach((outputFilePath) =>
                fs.unlinkSync(outputFilePath),
              );

              cloudinaryResults.map((result) =>
                imageUrls.push(result.secure_url),
              );
            }

            if (imageUrls.length !== 0) {
              contentParsed.ops.forEach((op: any) => {
                if (
                  op.insert &&
                  op.insert.image &&
                  op.insert.image.startsWith('data:image')
                ) {
                  const index = base64Images.indexOf(op.insert.image);

                  if (index !== -1) {
                    op.insert.image = imageUrls[index];
                  }
                }
              });
            }

            let coverImageUrl: string | undefined;

            if (coverImage) {
              const bytes = await coverImage.arrayBuffer();
              const buffers = new Uint8Array(bytes);
              // const pathCoverImage = path.join(
              //   process.cwd(),
              //   'tmp',
              //   uuidv4() + coverImage.name,
              // );

              const pathCoverImage = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${
                user.id
              }-${uuidv4()}.jpg`;
              fs.writeFileSync(pathCoverImage, buffers);

              const { secure_url } = await cloudinary.v2.uploader.upload(
                pathCoverImage,
                {
                  folder: 'blogs',
                  use_filename: true,
                },
              );

              if (!secure_url) {
                coverImageUrl = undefined;
              } else {
                coverImageUrl = secure_url;
              }

              fs.unlinkSync(pathCoverImage);
            }

            const slug = slugify(title, {
              lower: true,
              replacement: '-',
              strict: true,
            });

            const blog = await db.blog.create({
              data: {
                // authorId: user.id,
                title,
                content: JSON.stringify(contentParsed),
                imageUrl: coverImageUrl,
                tags: listTags,
                slug,
                published: JSON.parse(published),
                author: {
                  connect: { id: user.id },
                },
              },
            });

            if (!blog) {
              return error(500, "Can't create blog");
            }

            // const userWithBlogs = await db.user.findUnique({
            //   where: { id: user.id },
            //   include: { blogs: true },
            // });

            return {
              base64Images,
              outputFilePaths,
              imageUrls,
              contentParsed,
              blog,
              //   userWithBlogs,
            };
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          body: t.Object({
            title: t.String(),
            tags: t.Optional(t.String()),
            content: t.String(),
            published: t.String(),
            coverImage: t.Optional(t.File()),
          }),
        },
      )
      .delete(
        '/:blogId',
        async ({ error, params }) => {
          try {
            if (!params.blogId) {
              return error(400, 'Missing blogId');
            }

            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: { clerkId: clerkId },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            const blog = await db.blog.delete({
              where: { id: params.blogId },
            });

            if (!blog) {
              return error(404, 'Delete failed');
            }

            return {
              status: 'success',
              blog,
            };
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ blogId: t.String() }),
        },
      )
      .put(
        '/:blogId',
        async ({ error, params, body }) => {
          try {
            const { title, tags, content, published, coverImage } = body;
            const { blogId } = params;

            const listTags: string[] = [];

            if (tags) {
              const tagsParse: string = JSON.parse(tags);
              tagsParse.split(',').map((tag) => listTags.push(tag.trim()));
            }

            if (!title || !content) {
              return error(400, 'Missing title, author or content');
            }

            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: { clerkId: clerkId },
            });

            if (!user) {
              return error(404, 'User not found');
            }

            const contentParsed = JSON.parse(content);

            const base64Images: any[] = [];

            contentParsed.ops.forEach((op: any) => {
              if (
                op.insert &&
                op.insert.image &&
                op.insert.image.startsWith('data:image')
              ) {
                base64Images.push(op.insert.image);
              }
            });

            const outputFilePaths: string[] = [];

            if (base64Images.length !== 0) {
              base64Images.forEach((base64Image, index) => {
                const outputFilePath = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${
                  user.id
                }-${Date.now()}-${uuidv4()}.png`;
                convertBase64ToImage(base64Image, outputFilePath);
                outputFilePaths.push(outputFilePath);
              });
            }

            const imageUrls: string[] = [];

            if (outputFilePaths.length !== 0) {
              const cloudinaryPromises = outputFilePaths.map(
                (outputFilePath) => {
                  return cloudinary.v2.uploader.upload(outputFilePath, {
                    folder: 'blogs',
                    use_filename: true,
                  });
                },
              );

              const cloudinaryResults = await Promise.all(cloudinaryPromises);

              if (!cloudinaryResults) {
                return error(500, "Can't upload images to cloudinary");
              }

              outputFilePaths.forEach((outputFilePath) =>
                fs.unlinkSync(outputFilePath),
              );

              cloudinaryResults.map((result) =>
                imageUrls.push(result.secure_url),
              );
            }

            if (imageUrls.length !== 0) {
              contentParsed.ops.forEach((op: any) => {
                if (
                  op.insert &&
                  op.insert.image &&
                  op.insert.image.startsWith('data:image')
                ) {
                  const index = base64Images.indexOf(op.insert.image);

                  if (index !== -1) {
                    op.insert.image = imageUrls[index];
                  }
                }
              });
            }

            let coverImageUrl: string | undefined;

            if (coverImage) {
              const bytes = await coverImage.arrayBuffer();
              const buffers = new Uint8Array(bytes);

              const pathCoverImage = `${process.env.NODE_ENV === 'production' ? '/tmp/' : process.cwd() + '/tmp/'}${
                user.id
              }-${uuidv4()}.jpg`;
              fs.writeFileSync(pathCoverImage, buffers);

              const { secure_url } = await cloudinary.v2.uploader.upload(
                pathCoverImage,
                {
                  folder: 'blogs',
                  use_filename: true,
                },
              );

              if (!secure_url) {
                coverImageUrl = undefined;
              } else {
                coverImageUrl = secure_url;
              }

              fs.unlinkSync(pathCoverImage);
            }

            const slug = slugify(title, {
              lower: true,
              replacement: '-',
              strict: true,
            });

            const blog = await db.blog.update({
              where: { id: blogId },
              data: {
                title,
                content: JSON.stringify(contentParsed),
                imageUrl: coverImageUrl,
                tags: listTags,
                slug,
                published: JSON.parse(published),
                author: {
                  connect: { id: user.id },
                },
              },
            });

            if (!blog) {
              return error(500, "Can't create blog");
            }

            return {
              base64Images,
              outputFilePaths,
              imageUrls,
              contentParsed,
              blog,
            };
          } catch (err) {
            console.log(err);

            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ blogId: t.String() }),
          body: t.Object({
            title: t.String(),
            tags: t.Optional(t.String()),
            content: t.String(),
            published: t.String(),
            coverImage: t.Optional(t.File()),
          }),
        },
      )
      .post(
        '/like/:blogId',
        async ({ error, params }) => {
          try {
            const { blogId } = params;

            if (!blogId) {
              return error(400, 'Missing blogId');
            }

            // const identity = await jwt.verify(auth.value);
            const { userId: clerkId } = await auth();

            if (!clerkId) {
              return error(401, 'Unauthorized');
            }

            const user = await db.user.findUnique({
              where: { clerkId },
            });

            const blog = await db.blog.findUnique({ where: { id: blogId } });

            if (!user || !blog) {
              return error(404, 'User or blog not found');
            }

            const like = await db.like.findFirst({
              where: {
                userId: user.id,
                blogId: blog.id,
              },
            });

            if (like) {
              return error(400, 'You already liked this blog');
            }

            const createLike = await db.like.create({
              data: {
                blogId: blog.id,
                userId: user.id,
                liked: true,
              },
            });

            if (!createLike) {
              return error(500, 'Failed to create like');
            }

            return {
              status: 'success',
              like: createLike,
            };
          } catch (err) {
            console.log(err);
            return error(500, "Something's wrong");
          }
        },
        {
          params: t.Object({ blogId: t.String() }),
        },
      )
      //   .post(
      //     '/unlike/:blogId',
      //     async ({ error, jwt, params, cookie: { auth } }) => {
      //       try {
      //         const { blogId } = params;

      //         if (!blogId) {
      //           return error(400, 'Missing blogId');
      //         }

      //         const identity = await jwt.verify(auth.value);
      //         if (!identity) {
      //           return error(401, 'Unauthorized');
      //         }

      //         // Truy vấn đồng thời
      //         // const [user, blog] = await Promise.all([
      //         //   User.findById(identity.id).session(session),
      //         //   Blog.findById(blogId).session(session),
      //         // ]);

      //         if (!user) {
      //           return error(404, 'User not found');
      //         }

      //         if (!blog) {
      //           return error(404, 'Blog not found');
      //         }

      //         // const like = await Like.findOne({
      //         //   blog: blogId,
      //         //   user: user.id,
      //         // }).session(session);

      //         if (!like) {
      //           return error(400, 'You have not liked this blog');
      //         }

      //         const deletedLike = await Like.findByIdAndDelete(like.id).session(
      //           session,
      //         );
      //         if (!deletedLike) {
      //           return error(500, 'Failed to remove like');
      //         }

      //         const updateBlog = await Blog.findByIdAndUpdate(blogId, {
      //           $pull: { likes: deletedLike.id },
      //         }).session(session);

      //         if (!updateBlog) {
      //           return error(500, 'Failed to update blog');
      //         }

      //         return {
      //           status: 'success',
      //           like: deletedLike,
      //         };
      //       } catch (err) {
      //         console.log(err);
      //         return error(500, "Something's wrong");
      //       }
      //     },
      //     {
      //       params: t.Object({ blogId: t.String() }),
      //     },
      //   )
      .get(
        '/tags',
        async ({ error, query }) => {
          try {
            const { tags } = query;

            if (!tags) {
              return error(400, 'Missing tags');
            }

            const blogs = await db.blog.findMany({
              where: {
                tags: {
                  hasSome: tags,
                },
              },
              select: {
                title: true,
                id: true,
              },
              take: 8,
              orderBy: {
                createdAt: 'desc',
              },
            });

            if (!blogs || blogs.length === 0) {
              return error(404, 'Blogs not found');
            }
            return blogs;
          } catch (err) {
            return error(500, "Something's wrong");
          }
        },
        {
          query: t.Object({ tags: t.Optional(t.Array(t.String())) }),
        },
      ),
  );
