import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect admin and dashboard routes: require JWT-like cookie.
const PROTECTED_PATHS = ['/admin', '/dashboard'];
const COOKIE_KEYS = ['jwt', 'accessToken'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PATHS.some((base) => pathname === base || pathname.startsWith(`${base}/`));
  if (!isProtected) return NextResponse.next();

  const hasToken = COOKIE_KEYS.some((key) => Boolean(req.cookies.get(key)?.value));
  if (hasToken) return NextResponse.next();

  const loginUrl = new URL('/sign-in', req.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
