'use client';
import React from 'react';
import Link from 'next/link';
import AuthCard from '@/app/(auth)/AuthCard';
import ApplicationLogo from '@/components/ApplicationLogo';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

function LoginComponent({ children }) {
    const pathName = usePathname();

    const GetTitle = pathName => {
        if (pathName === '/login') {
            return 'Login';
        }
        if (pathName === '/register') {
            return 'Register';
        }
        if (pathName === '/forgot-password') {
            return 'Forgot Password';
        }
        if (pathName === '/password-reset/[token]') {
            return 'Password Reset';
        }
        if (pathName === '/verifying-account') {
            return 'Verifying of Account';
        }
        if (pathName === '/login-otp') {
            return 'Verification of Code';
        }
    };

    return (
        <div>
            <div className='text-gray-900 antialiased'>
                {pathName != '/login' ? (
                    <div className='absolute z-50 top-5 left-2 flex flex-row gap-2'>
                        {/* <Link href='/login' className='flex items-center group'>
                            <svg
                                className={`w-6 h-6 text-white dark:text-white mt-10 hover:text-stone-200 ${
                                    pathName != '/login'
                                        ? 'group-hover:text-slate-600'
                                        : ''
                                }`}
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                width='100'
                                height='100'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='m15 19-7-7 7-7'
                                />
                            </svg>
                            <span
                                className={`text-md font-bold text-white mt-10  hover:text-stone-200 ${
                                    pathName != '/login'
                                        ? 'group-hover:text-slate-600'
                                        : ''
                                }`}
                            >
                                Back
                            </span>
                        </Link> */}
                    </div>
                ) : null}

                <AuthCard
                    logo={
                        <Link href='/login'>
                            <ApplicationLogo className='w-20 h-20 fill-current text-blue-800' />
                        </Link>
                    }
                    title={GetTitle(pathName)}
                >
                    {children}
                </AuthCard>
                <footer className='fixed bottom-0 left-0 right-0 bg-blue-800 p-6 text-center text-white'>
                    <p className='text-xs'>&copy; 2024 Spoon.ph</p>
                    <p className='text-xs'>All rights reserved.</p>
                </footer>
            </div>
            <Toaster />
        </div>
    );
}

export default LoginComponent;
