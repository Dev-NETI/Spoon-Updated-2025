import React from 'react';
import Image from 'next/image';
import icon from '/public/assets/app/icons/plate.png';

function layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen overflow-x-hidden'>
            <div className='flex flex-row md:flex-row md:grow items-center pb-3 bg-blue-300 relative'>
                <div className='order-1 md:hidden z-40'>
                    <Image
                        src={icon}
                        width={300}
                        height={300}
                        className='mt-4 shadow-sm animate-spin-slow'
                        alt='Spoon Logo'
                    />
                </div>
                <div className='items-center text-center md:justify-center md:grow md:ml-4 w-full md:w-auto flex flex-col md:flex-row z-40'>
                    <div className='md:ml-4'>
                        <p className='text-slate-50 text-2xl font-bold md:text-5xl lg:text-5xl animate-fade-up animate-once animate-duration-1000'>
                            The Seafarer's Cookbook
                        </p>
                        <p className='text-slate-50 mt-2 text-base md:text-4xl lg:text-4xl italic font-thin animate-fade-up animate-once animate-duration-1000'>
                            Tasty Recipes for a Healthy Onboard Life
                        </p>
                    </div>
                </div>
                <div className='ocean'>
                    <div className='wave' />
                    <div className='wave' />
                    <div className='wave' />
                </div>
            </div>
            <div className='flex-1 bg-slate-50 p-4 achor'>
                <div className='mx-auto max-w-screen-xl'>{children}</div>
            </div>
        </div>
    );
}

export default layout;
