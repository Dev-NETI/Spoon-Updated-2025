import React from 'react';
import { disclaimerDescription } from '@/data/calculator-data';

function Disclaimer() {
    return (
        <div className='flex flex-col mt-4 shadow-stone-300 shadow-2xl'>
            <div className='bg-red-700 flex gap-2 p-4 rounded-t-xl'>
                <svg
                    className='w-6 h-6 text-stone-100 dark:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                >
                    <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                </svg>
                <p className='font-bold text-stone-100 text-xl'>DISCLAIMER</p>
            </div>

            <div className='bg-white p-6 text-justify rounded-b-xl'>
                <p className='font-semibold text-stone-700 text-sm'>
                    {disclaimerDescription}
                </p>
            </div>
        </div>
    );
}

export default Disclaimer;
