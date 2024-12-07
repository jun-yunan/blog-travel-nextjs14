import { NextResponse, NextRequest, NextFetchEvent } from 'next/server';
import { decrypt } from './lib/session';

const protectedRoutes = ['/dashboard', '/blogs'];
const publicRoutes = ['/sign-in', '/sign-up', '/'];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);

  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get('auth');

  if (!token?.value && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const session = await decrypt(token?.value);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
  if (
    isPublicRoute &&
    session &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
