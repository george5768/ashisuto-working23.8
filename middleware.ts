import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANG_OPTIONS, Languages } from '@/app/enum/global';

/**
 * Valid language URL slugs — derived from LANG_OPTIONS.
 * Never hardcode slugs here; change them once in LANG_OPTIONS and everything updates.
 */
const VALID_SLUGS: readonly string[] = LANG_OPTIONS.map(l => l.slug);

/** Default language used for redirect when no lang prefix is present */
const DEFAULT_SLUG = LANG_OPTIONS.find(l => l.code === Languages.ENGLISH)!.slug;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let Next.js internals, API routes, and static files pass through
  const firstSegment = pathname.split('/')[1] ?? '';

  // Already prefixed with a valid lang slug → pass through
  if (VALID_SLUGS.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Redirect everything else to /{defaultLang}/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_SLUG}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on all paths except Next.js internals, API routes, and files with extensions
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)',],
};
