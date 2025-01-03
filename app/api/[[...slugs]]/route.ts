import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';
import { auth } from '../_plugins/auth';
import { blog } from '../_plugins/blog';
import { user } from '../_plugins/user';
import { comment } from '../_plugins/comment';

const app = new Elysia({
  prefix: '/api',
})
  .use(swagger())
  .use(cors())
  .get('/', () => ({ message: 'Welcome to Elysia API fff' }))
  .use(auth)
  .use(blog)
  .use(user)
  .use(comment);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
