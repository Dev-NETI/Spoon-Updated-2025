import { FiAlignJustify, FiAlignRight } from 'react-icons/fi';
import Image from 'next/image';
import spoonICO from '/public/images/spoon-logo-blue.png';
import { React, useState } from 'react';

const NavBar = ({ toggleSidebar, isOpen }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='flex bg-slate-100 w-min-screen h-20 border border-b items-center px-5 sticky top-0 z-50'>
            <div className='flex justify-start items-center w-full gap-5'>
                <div
                    onClick={toggleSidebar}
                    className='relative flex w-12 h-12 items-center justify-center'
                >
                    <FiAlignJustify
                        className={`absolute text-4xl cursor-pointer text-indigo-800 transition duration-600 ease-in-out ${
                            isOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <FiAlignRight
                        className={`absolute text-4xl cursor-pointer text-indigo-800 transition duration-600 ease-in-out ${
                            isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                </div>
                <h1 className='text-2xl font-bold'>Recipes</h1>
            </div>
            <div className='flex justify-end w-full'>
                <Image
                    src={spoonICO}
                    width={50}
                    className='w-50 h-50'
                    alt='spoon ico'
                />
                <div className='flex flex-col'>
                    <div className='items-center px-2'>
                        <h2 className='text-md font-bold'>Daniel Narciso</h2>
                    </div>
                    <div className='items-center px-2'>
                        <h2 className='text-xs'>Land Based Employee</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
