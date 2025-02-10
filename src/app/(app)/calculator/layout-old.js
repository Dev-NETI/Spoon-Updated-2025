import React from 'react';
import Disclaimer from '@/components/app/calculator/disclaimer';

function layout({ children }) {
    return (
        <div
            className='flex flex-col bg-gray-100
        p-1 md:p-2 lg:p-2 mb-14'
        >
            <Disclaimer />
            {children}
        </div>
    );
}

export default layout;
