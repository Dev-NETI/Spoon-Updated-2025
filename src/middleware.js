import { NextResponse } from 'next/server';
import VerifiedLoginMiddleware from './middleware-rules/VerifiedLoginMiddleware';
import UserTypeAuthorizationMiddleware from './middleware-rules/UserTypeAuthorizationMiddleware';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const cookies = request.cookies;

    const unverifiedLoginProtectedPaths = [
        '/dashboard',
        '/profile',
        '/account-setup',
        '/calculator',
        '/favorite-recipe',
        '/recipe',
        '/recipe-view',
        '/home',
        '/manage-recipe',
        '/user',
    ];

    const protectedUserTypeRoutes = [
        '/dashboard',
        '/admin/user',
        '/admin/home',
        '/admin/manage',
    ];

    // Protect routes using user type
    const userTypeAuthResponse = UserTypeAuthorizationMiddleware(
        url,
        cookies,
        protectedUserTypeRoutes
    );
    if (userTypeAuthResponse) return userTypeAuthResponse;

    // Check if login is verified for unverified login protected paths
    VerifiedLoginMiddleware(unverifiedLoginProtectedPaths, url, cookies);

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/account-setup/:path*',
        '/calculator/:path*',
        '/favorite-recipe/:path*',
        '/recipe/:path*',
        '/recipe-view/:path*',
        '/home/:path*',
        '/manage-recipe/:path*',
        '/user/:path*',
        '/admin/:path*',
    ],
};
