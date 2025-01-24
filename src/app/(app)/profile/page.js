'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';

const Profile = () => {
    const { logout } = useAuth();

    return (
        <>
            <div className='flex flex-row'>
                <div className='basis-full'>
                    <Card>
                        <CardHeader className='flex flex-col items-center justify-center'>
                            <h2 className='text-center text-xl font-semibold '>
                                My Profile
                            </h2>
                            <hr className='border-gray-500 mx-auto w-2/4' />
                        </CardHeader>
                        <CardContent className='flex flex-col md:flex-row gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-row items-left justify-left gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6 hover:text-blue-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                        />
                                    </svg>
                                    <Link
                                        href={`/profile/edit-profile`}
                                        className='text-left text-base font-light flex flex-col md:flex-row 
                                        gap-1 items-left w-full hover:text-blue-600'
                                    >
                                        Edit Personal Information
                                    </Link>
                                </div>
                                <div className='flex flex-row items-left justify-left gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6 hover:text-blue-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                        />
                                    </svg>
                                    <Link
                                        href={`/profile/update-contact`}
                                        className='text-left text-base font-light flex flex-col md:flex-row 
                                        gap-1 items-left w-full hover:text-blue-600'
                                    >
                                        Update Contact Information
                                    </Link>
                                </div>
                                <div className='flex flex-row items-left justify-left gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6 hover:text-blue-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <rect
                                            x='6'
                                            y='10'
                                            width='12'
                                            height='10'
                                            rx='2'
                                            ry='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                        />
                                        <path
                                            d='M16 10V7a4 4 0 10-8 0v3'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                        />
                                    </svg>

                                    <Link
                                        href={`/profile/update-password`}
                                        className='text-left text-base font-light flex flex-col md:flex-row 
                                        gap-1 items-left w-full hover:text-blue-600'
                                    >
                                        Change Password
                                    </Link>
                                </div>
                                <div className='flex flex-row items-left justify-left gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-6 w-6 hover:text-blue-600'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                        />
                                    </svg>
                                    <button
                                        onClick={logout}
                                        className='text-left text-base font-light flex flex-col md:flex-row gap-1 w-full hover:text-blue-600'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Profile;
