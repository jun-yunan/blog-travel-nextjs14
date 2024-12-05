import 'server-only';

import { SignJWT, jwtVerify } from 'jose';

const encodedKey = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET!,
);
export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}
