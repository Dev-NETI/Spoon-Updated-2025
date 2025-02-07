import React from 'react';
import Disclaimer from '@/components/app/calculator/disclaimer';

function layout({ children }) {
    return (
        <div
            className='flex flex-col 
                       p-1 md:p-6 lg:p-6 mb-14 
                     bg-white rounded-lg gap-2'
        >
            <p className='text-stone-800 text-2xl font-bold'>Calculator</p>
            <p className='text-stone-800 text-sm italic font-semibold'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <hr class='border-t border-gray-300 ' />
            <Disclaimer />
            {children}
        </div>
    );
}

export default layout;
