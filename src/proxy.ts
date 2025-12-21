import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/core/constant/route';

const adminPaths = [
    ROUTES.admin.dashboard,
    ROUTES.admin.project,
    ROUTES.admin.farmer,
    ROUTES.admin.collector,
    ROUTES.admin.user,
];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/staking' || pathname.startsWith('/staking/')) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    if (adminPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
        const jwt = request.cookies.get('jwt')?.value;
        const role = request.cookies.get('role')?.value;

        if (!jwt || !role) {
            const url = request.nextUrl.clone();
            url.pathname = ROUTES.auth.signIn;
            return NextResponse.redirect(url);
        }

        try {
            const profileUrl = new URL('/api/proxy/auth/profile', request.url);
            const profileRes = await fetch(profileUrl, {
                headers: {
                    cookie: request.headers.get('cookie') ?? '',
                },
                cache: 'no-store',
            });

            if (!profileRes.ok) {
                const url = request.nextUrl.clone();
                url.pathname = ROUTES.auth.signIn;
                return NextResponse.redirect(url);
            }

            const profileData = await profileRes.json();
            const resolvedRole = profileData?.user?.role ?? role;

            if (resolvedRole !== 'ADMIN') {
                const url = request.nextUrl.clone();
                url.pathname = ROUTES.home;
                return NextResponse.redirect(url);
            }
        } catch {
            const url = request.nextUrl.clone();
            url.pathname = ROUTES.auth.signIn;
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/staking/:path*',
        '/dashboard/:path*',
        '/project/:path*',
        '/farmer/:path*',
        '/collector/:path*',
        '/user/:path*',
    ],
};
