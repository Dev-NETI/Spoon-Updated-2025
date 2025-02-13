import React, { useState } from 'react';
import { disclaimerDescription } from '@/data/calculator-data';
import { BsFillFileMinusFill, BsFillPlusSquareFill } from 'react-icons/bs';

function Disclaimer() {
    const [closeDisclaimer, setCloseDisclaimer] = useState(true);
    return (
        <div className='flex flex-col mt-1 shadow-stone-300 shadow-2xl duration-500 transition'>
            <div
                onClick={() => setCloseDisclaimer(prev => !prev)}
                className={`bg-red-700 flex justify-between p-2 transition-all ease-in-out duration-300 cursor-pointer ${
                    closeDisclaimer ? 'rounded-t-xl' : 'rounded-xl'
                }`}
            >
                <div className='flex items-center'>
                    <div className='flex items-center gap-2'>
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
                        <p className='font-bold text-stone-100 text-[1rem]'>
                            DISCLAIMER
                        </p>
                    </div>
                </div>
            </div>

            <div
                className={`text-justify transition-all duration-500 bg-white ease-in-out overflow-hidden ${
                    closeDisclaimer
                        ? 'max-h-[500px] opacity-100 p-3 rounded-b-xl'
                        : 'max-h-0 opacity-0 pointer-events-none'
                }`}
            >
                <p className='font-semibold text-stone-700 text-sm'>
                    {disclaimerDescription}
                </p>
            </div>
        </div>
    );
}

export default Disclaimer;
