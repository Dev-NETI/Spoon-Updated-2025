'use client';
import React from 'react';
import Image from 'next/image';
import { GiFat, GiMuscleFat } from 'react-icons/gi';
import { MdOutlineAccessibility } from 'react-icons/md';
import TableUser from '@/components/app/dashboard/TableUser';

const Dashboard = () => {
    return (
        <div className='flex flex-1 gap-3 max-h-svh'>
            <TableUser
                icon={<MdOutlineAccessibility />}
                title={'Top 20 Underweight'}
                color={'text-yellow-500'}
            >
                <tbody className='text-[.8rem] font-semibold'>
                    <tr className='border border-b-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                    <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                    <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                </tbody>
            </TableUser>
            <TableUser
                icon={<GiMuscleFat />}
                title={'Top 20 Overweight'}
                color={'text-purple-800'}
            >
                <tbody className='text-[.8rem] font-semibold'>
                    <tr className='border border-b-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                    <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                    <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                        <td className='flex gap-1 items-center'>
                            <Image
                                src='/assets/app/icons/armenia flag.png'
                                alt='user_img'
                                width={7}
                                height={7}
                                className='w-7 h-7 rounded-full'
                                priority
                            />
                            <span>Daniel Narciso</span>
                        </td>
                        <td>64</td>
                        <td>23.2</td>
                    </tr>
                </tbody>
            </TableUser>
            <div className='bg-slate-50 gap-x-2 rounded-md w-4/12 h-full flex flex-col'>
                <div className='flex items-center gap-2 text-red-800 text-[1.4rem] font-semibold border-b p-2'>
                    <GiFat />
                    <span>Top 20 Obese</span>
                </div>
                <div className='p-2'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='bg-slate-300 font-semibold text-[.9rem]'>
                                <td>Name</td>
                                <td>Weight</td>
                                <td>BMI</td>
                            </tr>
                        </thead>
                        <tbody className='text-[.8rem] font-semibold'>
                            <tr className='border border-b-0 hover:bg-slate-200 cursor-pointer duration-300'>
                                <td className='flex gap-1 items-center'>
                                    <Image
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='user_img'
                                        width={7}
                                        height={7}
                                        className='w-7 h-7 rounded-full'
                                        priority
                                    />
                                    <span>Daniel Narciso</span>
                                </td>
                                <td>64</td>
                                <td>23.2</td>
                            </tr>
                            <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                                <td className='flex gap-1 items-center'>
                                    <Image
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='user_img'
                                        width={7}
                                        height={7}
                                        className='w-7 h-7 rounded-full'
                                        priority
                                    />
                                    <span>Daniel Narciso</span>
                                </td>
                                <td>64</td>
                                <td>23.2</td>
                            </tr>
                            <tr className='border border-top-0 hover:bg-slate-200 cursor-pointer duration-300'>
                                <td className='flex gap-1 items-center'>
                                    <Image
                                        src='/assets/app/icons/armenia flag.png'
                                        alt='user_img'
                                        width={7}
                                        height={7}
                                        className='w-7 h-7 rounded-full'
                                        priority
                                    />
                                    <span>Daniel Narciso</span>
                                </td>
                                <td>64</td>
                                <td>23.2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
