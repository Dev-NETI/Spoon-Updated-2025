import {
    FiAlignJustify,
    FiAlignRight,
    FiLogOut,
    FiSettings,
    FiUser,
} from 'react-icons/fi';
import Image from 'next/image';
import { React, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { HiEnvelope, HiEnvelopeOpen } from 'react-icons/hi2';

const NavBar = ({ toggleSidebar, isOpen, title }) => {
    const [profileshow, setProfileShow] = useState(false);
    const [notificationShow, setNotificationShow] = useState(false);
    const defaultUserPic =
        process.env.NEXT_PUBLIC_STORAGE + '/images/profile-5.png';

    const getTitle = title => {
        switch (title) {
            case 'BMI Calculator':
            case 'Calorie Calculator':
            case 'Nutrient Calculator':
            case 'Blood Pressure Tracker':
            case 'My Ideal Plato':
                return 'Nutrispoon Companion'; // Common return for all matched cases
            default:
                return title; // Return title for other cases
        }
    };

    return (
        <div className='flex bg-slate-100 xl:w-min-screen h-20 border border-b items-center px-5 sticky top-0 z-50 shadow-sm'>
            <div className='flex justify-start items-center w-full gap-5 select-none'>
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
                <h1 className='text-2xl font-bold transition duration-300 ease-in-out'>
                    {getTitle(title)}
                </h1>
            </div>
            <div className='relative justify-end w-full flex'>
                <div className='flex items-center gap-5'>
                    <div
                        onClick={() => {
                            setNotificationShow(prevState => !prevState);
                            setProfileShow(false);
                        }}
                        className={`relative flex transition duration-300 ease-in-out cursor-pointer ${
                            notificationShow ? 'scale-110 rotate-[14deg]' : ''
                        }`}
                    >
                        <FaBell className='text-yellow-500 text-3xl' />
                        <div className='absolute top-0 right-0'>
                            <span className='relative flex ms-5'>
                                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75'></span>
                                <span className='relative inline-flex h-3 w-3 rounded-full bg-red-500'></span>
                            </span>
                        </div>
                    </div>

                    <div
                        className={`flex items-center gap-1 cursor-pointer p-2`}
                    >
                        <div className='flex'>
                            <div
                                className={`flex items-center gap-2 transition duration-300 ease-in-out ${
                                    profileshow ? 'scale-[1.03]' : ''
                                }`}
                                onClick={() => {
                                    setProfileShow(prevState => !prevState);
                                    setNotificationShow(false);
                                }}
                            >
                                <Image
                                    src={defaultUserPic}
                                    width={50}
                                    height={50}
                                    className='rounded-full border border-spoonblue w-auto h-auto'
                                    alt='User Avatar'
                                />
                                <div className='hidden xl:flex flex-col'>
                                    <div className='px-2'>
                                        <h2 className='text-md font-bold'>
                                            Daniel Narciso
                                        </h2>
                                    </div>
                                    <div className='px-2'>
                                        <h2 className='text-xs'>
                                            Land Based Employee
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`relative transition-all duration-300 ease-in-out ${
                                    notificationShow
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-4 pointer-events-none'
                                }`}
                            >
                                <div className='flex-col absolute top-14 right-1 bg-slate-200 w-72 rounded-md shadow-lg'>
                                    <div className='h-10 border-b flex items-center ps-3 bg-slate-100 hover:bg-slate-200 rounded-t-md transition duration-300 ease-in-out'>
                                        <div>
                                            <HiEnvelopeOpen />
                                        </div>
                                        <span className='text-xs font-semibold p-2 justify-start items-center'>
                                            Daniel Narciso has sent you a
                                            message
                                        </span>
                                    </div>
                                    <div className='h-10 border-b flex items-center ps-3 hover:bg-slate-200 rounded-b-md transition duration-300 ease-in-out'>
                                        <div>
                                            <HiEnvelope />
                                        </div>
                                        <span className='text-xs font-semibold p-2'>
                                            Daniel Narciso has sent you a
                                            message
                                        </span>
                                    </div>
                                    <div className='h-6 border-b flex justify-center items-center ps-3 bg-blue-800 text-white rounded-b-md transition duration-300 ease-in-out'>
                                        <span className='text-xs font-semibold p-2 underline underline-offset-1 hover:text-indigo-300'>
                                            Show all notifications
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`relative transition-all duration-300 ease-in-out mt-4 ${
                                    profileshow
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 -translate-y-4 pointer-events-none'
                                }`}
                            >
                                <div
                                    className={`absolute top-10 right-0 bg-slate-100 w-48 rounded-md shadow-lg`}
                                >
                                    <div className='h-10 border-b flex items-center ps-3 hover:bg-slate-200 rounded-t-md transition duration-300 ease-in-out'>
                                        <FiUser className='text-spoonblue' />
                                        <h1 className='text-sm font-semibold p-2'>
                                            Profile
                                        </h1>
                                    </div>
                                    <div className='h-10 border-b flex items-center ps-3 hover:bg-slate-200 transition duration-300 ease-in-out'>
                                        <FiSettings className='text-yellow-500' />
                                        <h1 className='text-sm font-semibold p-2'>
                                            Settings
                                        </h1>
                                    </div>
                                    <div className='h-10 flex items-center ps-3 hover:bg-slate-200 rounded-b-md transition duration-300 ease-in-out'>
                                        <FiLogOut className='text-red-400' />
                                        <h1 className='text-sm font-semibold p-2'>
                                            Log out
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
