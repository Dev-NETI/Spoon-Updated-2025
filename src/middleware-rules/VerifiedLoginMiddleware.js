import { NextResponse } from 'next/server';

export default function VerifiedLoginMiddleware(
    unverifiedLoginProtectedPaths,
    url,
    cookies
) {
    if (unverifiedLoginProtectedPaths.includes(url.pathname)) {
        if (
            cookies.get('35de80170cda0d14e2cdd82e9e89d375')?.value !==
            '6f7d41b92d3e4519c9f12b765a83ab4f'
        ) {
            url.pathname = '/login-otp';
            return NextResponse.redirect(url);
        } else {
            return NextResponse.next();
        }
    }
}
