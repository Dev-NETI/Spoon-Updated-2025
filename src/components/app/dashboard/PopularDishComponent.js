import React from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

function PopularDishComponent() {
    return (
        <>
            <div className='flex flex-row z-50 mt-5'>
                <div className='basis-8/12'>
                    <p className='text-xl font-semibold'>
                        Top Most Popular Dish
                    </p>
                </div>
                <div className='basis-6/12 text-end justify-between'>
                    <a
                        href='#'
                        className='text-blue-800 text-base text-balance '
                    >
                        View all &gt;
                    </a>
                </div>
            </div>
            <div className='flex flex-row mt-2 overflow-x-auto space-x-2 py-3'>
                <div className='h-6/12 flex-shrink-0'>
                    <div className='w-full max-w-xs px-1'>
                        <Card>
                            <Image
                                src='/assets/app/recipes/01 BANH MI.jpg'
                                alt='flag'
                                height={100}
                                width={100}
                                className='h-full w-full object-cover rounded-t-md'
                            />
                            <CardFooter>
                                <div className='flex flex-col mt-2'>
                                    <div className='flex flex-row'>
                                        <p className='text-left font-semibold text-md mt-2 inline'>
                                            Pork Bistek
                                        </p>
                                        <p className='text-center text-md ml-1 inline bg-blue-900 rounded-md px-1 mt-2 text-white'>
                                            Main Course
                                        </p>
                                    </div>
                                    <div className='flex flex-row items-center mt-2'>
                                        <Image
                                            src='/assets/app/icons/armeniaflag.png'
                                            alt='flag'
                                            height={20}
                                            width={20}
                                            className='rounded-full mr-1'
                                        />
                                        <p className='text-left text-sm'>
                                            Philippines | 3.5 Reviews
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className='h-6/12 flex-shrink-0'>
                    <div className='w-full max-w-xs px-1'>
                        <Card>
                            <Image
                                src='/assets/app/recipes/TOSHIKOSHI SOBA (NEW YEAR_S EVE NOODLES).jpg'
                                alt='flag'
                                height={100}
                                width={100}
                                className='h-full w-full object-cover rounded-t-md'
                            />
                            <CardFooter>
                                <div className='flex flex-col mt-2'>
                                    <div className='flex flex-row'>
                                        <p className='text-left font-semibold text-md mt-2 inline'>
                                            Pork Bistek
                                        </p>
                                        <p className='text-center text-md ml-1 inline bg-blue-900 rounded-md px-1 mt-2 text-white'>
                                            Main Course
                                        </p>
                                    </div>
                                    <div className='flex flex-row items-center mt-2'>
                                        <Image
                                            src='/assets/app/icons/armeniaflag.png'
                                            alt='flag'
                                            height={20}
                                            width={20}
                                            className='rounded-full mr-1'
                                        />
                                        <p className='text-left text-sm'>
                                            Philippines | 3.5 Reviews
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopularDishComponent;
