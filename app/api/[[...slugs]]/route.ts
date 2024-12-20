import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { jwt } from '@elysiajs/jwt';
import { Elysia, t } from 'elysia';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { auth } from '../_controllers/auth';
import { blog } from '../_controllers/blog';
import { user } from '../_controllers/user';

const app = new Elysia({
  prefix: '/api',
})
  .use(swagger())
  .use(cors())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET_JWT!,
    }),
  )
  .get('/', () => 'Hello Elysia')
  .use(auth)
  .use(blog)
  .use(user);
// .group('/blogs', (app) =>
//   app.get('/blogs', async ({ error }) => {
//     const blogs = await db.blog.findMany({
//       include: {
//         author: true,
//       },
//     });

//     if (blogs.length === 0) {
//       return error(404, 'No blogs found');
//     }

//     return blogs;
//   }),
// );

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
