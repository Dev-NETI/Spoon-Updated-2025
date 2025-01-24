import React from 'react';
import { disclaimerDescription } from '@/data/calculator-data';

function Disclaimer() {
    return (
        <div className='basis-full flex flex-col mt-4 '>
            <div className='basis-full bg-red-600 flex gap-2 p-2'>
                <svg
                    className='w-6 h-6 text-stone-200 dark:text-white'
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
                <p className='font-bold text-stone-200 text-xl'>DISCLAIMER</p>
            </div>

            <div className='basis-full bg-stone-50 px-4 py-2 text-justify'>
                <p className='font-semibold text-stone-700 text-xs'>
                    {disclaimerDescription}
                </p>
            </div>
        </div>
    );
}

export default Disclaimer;
