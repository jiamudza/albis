import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token');
    if (
        request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/api') ||
        request.nextUrl.pathname.startsWith('/absensi') ||
        //   request.nextUrl.pathname.startsWith('/') ||
        request.nextUrl.pathname.startsWith('/_next/static') ||
        request.nextUrl.pathname.startsWith('/_next/image') ||
        request.nextUrl.pathname === '/favicon.ico' ||
        request.nextUrl.pathname.startsWith('/assets') ||
        request.nextUrl.pathname.startsWith('/background') ||
        request.nextUrl.pathname.startsWith('/logo.png') ||
        request.nextUrl.pathname.startsWith('/manifest.json') ||
        request.nextUrl.pathname.startsWith('/robots.txt') ||
        request.nextUrl.pathname.startsWith('/sitemap.xml')
    ) {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL('/login', request.url);

        loginUrl.searchParams.set(
            'callbackUrl',
            request.nextUrl.pathname + request.nextUrl.search
        );

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};