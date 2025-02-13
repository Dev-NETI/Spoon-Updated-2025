'use client';
import React from 'react';
import Disclaimer from '@/components/app/calculator/disclaimer';
import TabApplication from '@/components/app/calculator/TabApplication';

function layout({ children }) {
    return (
        <div className=''>
            <Disclaimer />
            <TabApplication />
            <div
                className='flex flex-col shadow-md
                       p-1 md:p-6 lg:p-6 mb-14 
                     bg-white rounded-b-lg gap-2 transition-all duration-500 ease-in-out delay-150'
            >
                {children}
            </div>
        </div>
    );
}

export default layout;
