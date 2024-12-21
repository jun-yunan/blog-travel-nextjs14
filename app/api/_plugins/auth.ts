import { Elysia, t } from 'elysia';
import jwt from '@elysiajs/jwt';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';

export const auth = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.SECRET_JWT!,
    }),
  )
  .group('/auth', (app) =>
    app
      .get('/me', async ({ error, jwt, cookie: { auth } }) => {
        try {
          const identity = await jwt.verify(auth.value);

          if (!identity) {
            return error(401, 'Unauthorized');
          }

          const user = await db.user.findUnique({
            where: { id: identity.id as string },
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
      // .post(
      //   '/sign-in',
      //   async ({ jwt, body, error, cookie: { auth } }) => {
      //     try {
      //       const { email, password } = body;

      //       if (!email || !password) {
      //         return error(400, 'Missing email or password');
      //       }

      //       const user = await db.user.findUnique({
      //         where: { email },
      //       });

      //       if (!user) {
      //         return error(400, 'User does not exist');
      //       }

      //       const correctPassword = await bcrypt.compare(
      //         password,
      //         user.password,
      //       );

      //       if (!correctPassword) {
      //         return error(400, 'Incorrect password');
      //       }

      //       auth.set({
      //         value: await jwt.sign({
      //           id: user.id.toString(),
      //           role: user.role,
      //           username: user.username,
      //           email: user.email,
      //         }),
      //         httpOnly: true,
      //         secure: process.env.NODE_ENV === 'production',
      //         // maxAge: 7 * 86400, //7 days
      //         maxAge: 30 * 60,
      //         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      //         domain:
      //           process.env.NODE_ENV === 'production'
      //             ? 'blog-travel-pearl.vercel.app'
      //             : 'localhost',
      //         path: '/',
      //       });

      //       return {
      //         status: 'success',
      //         user,
      //         auth: auth.value,
      //       };
      //     } catch (err) {
      //       console.log(err);
      //       return error(500, 'Internal Server Error');
      //     }
      //   },
      //   {
      //     body: t.Object({
      //       email: t.String(),
      //       password: t.String(),
      //     }),
      //   },
      // )
      // .post(
      //   '/sign-up',
      //   async ({ body, error }) => {
      //     try {
      //       const { username, email, password } = body;
      //       if (!username || !email || !password) {
      //         return error(
      //           400,
      //           "Bad Request: Missing 'username', 'email' or 'password'",
      //         );
      //       }

      //       const existingUser = await db.user.findUnique({
      //         where: { email },
      //       });

      //       if (existingUser) {
      //         return error(400, 'Email already exists');
      //       }

      //       const hashPassword = await bcrypt.hash(password, 10);

      //       const user = await db.user.create({
      //         data: {
      //           username,
      //           email,
      //           password: hashPassword,
      //         },
      //       });

      //       if (!user) {
      //         return error(500, "Can't create user");
      //       }

      //       return {
      //         status: 'success',
      //         user,
      //       };
      //     } catch (err) {
      //       console.log(err);
      //       return error(500, "Something's wrong");
      //     }
      //   },
      //   {
      //     body: t.Object({
      //       username: t.String(),
      //       email: t.String(),
      //       password: t.String(),
      //     }),
      //   },
      // )
      .get('/sign-out', async ({ cookie: { auth }, jwt, error, redirect }) => {
        try {
          const identity = await jwt.verify(auth.value);

          if (!identity) {
            return error(401, 'Unauthorized');
          }

          const user = await db.user.findUnique({
            where: { id: identity.id as string },
          });

          if (!user) {
            return error(404, 'User not found');
          }

          auth.remove();

          return;
        } catch (err) {
          return error(500, 'Internal Server Error');
        }
      }),
  );
