import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

// Paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/reset-password',
  '/auth/new-password',
];

// Static asset paths to always allow
const staticPaths = [
  '/_next',
  '/assets',
  '/favicon.ico',
  '/sitemap.xml',
  '/robots.txt',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets
  if (staticPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if the current path is a public path
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Get the auth tokens from cookies
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  const hasValidAuth = authToken || refreshToken;

  // If user is not authenticated and trying to access a protected route
  if (!hasValidAuth && !isPublicPath) {
    const loginUrl = new URL('/auth/login', request.url);
    // Store the original URL to redirect back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protected routes - try to refresh token if access token is missing but refresh token exists
  if (!isPublicPath && !authToken && refreshToken && process.env.BACKEND_URL) {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        const newToken = data?.data?.token;

        if (newToken) {
          const res = NextResponse.next();
          res.cookies.set(AUTH_TOKEN_KEY, newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60, // 1 hour
          });
          return res;
        }
      }

      // Refresh failed - clear cookies and redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(AUTH_TOKEN_KEY);
      res.cookies.delete(REFRESH_TOKEN_KEY);
      return res;
    } catch {
      // Refresh request failed - redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is authenticated and trying to access auth pages (login, etc.)
  if (hasValidAuth && isPublicPath) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
