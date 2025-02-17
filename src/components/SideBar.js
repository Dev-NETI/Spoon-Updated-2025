import {
    FiChevronRight,
    FiLayers,
    FiBookOpen,
    FiSlack,
    FiEdit,
    FiFileText,
    FiSettings,
    FiUsers,
} from 'react-icons/fi';
import Link from 'next/link';
import spoonICO from '/public/images/spoon-logo-full.png';
import logo from '/public/images/spoon-logo-text.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdPrivacyTip } from 'react-icons/md';
import { RiContactsBookFill } from 'react-icons/ri';

const SideBar = ({ isOpen, navBarTitle }) => {
    const [isMenuClick, setMenuClick] = useState(null);
    const [active, setActive] = useState('Spoon PH');
    const activeFormat =
        'translate-x-1 font-bold text-blue-900 border-e-[.5em] border-blue-900';
    const InactiveFormat = 'hover:translate-x-1 hover:text-indigo-900';

    useEffect(() => {
        navBarTitle(active);
    }, [active]);

    return (
        <div
            className={`top-0 left-0 w-2/12 bg-slate-100 transition-all duration-[900ms] ease-in-out hidden xl:flex flex-col ${
                isOpen
                    ? 'xl:sticky xl:translate-x-1.5 xl:opacity-100 xl:max-w-[900px] xl:pointer-events-auto'
                    : 'xl:max-w-0 xl:relative xl:opacity-0 xl:pointer-events-none'
            }`}
        >
            <div className='flex align-center ms-10 p-1 mt-6 border-b border-slate-200'>
                <Image
                    src={spoonICO}
                    className={`h-12 w-12 transition duration-1000 ease-in-out transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                    width='50'
                    height='auto'
                    alt='spoon ico'
                />
                <Image
                    src={logo}
                    className='h-12 w-auto'
                    width='100'
                    height='auto'
                    alt='spoon logo'
                />
            </div>

            <div
                className={`flex flex-col justify-start min-h-96 text-slate-500 ms-5 mt-4 text-[.8rem] gap-y-1 transition-all duration-700 delay-600 ease-in-out border-b ${
                    isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-1 opacity-0'
                }`}
            >
                <Link
                    href='/dashboard'
                    onClick={() => {
                        setActive('Dashboard');
                        setMenuClick(null);
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between duration-700 ease-in-out ${
                        active === 'Dashboard' ? activeFormat : InactiveFormat
                    }`}
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiLayers />
                        Dashboard
                    </span>
                </Link>
                <Link
                    href='/recipe'
                    onClick={() => {
                        setMenuClick(null);
                        setActive('Recipes');
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between duration-700 ease-in-out ${
                        active === 'Recipes' || active === 'Spoon PH'
                            ? activeFormat
                            : InactiveFormat
                    }`}
                >
                    <span className='ms-5 flex items-center gap-2 hover:text-indigo-900 text-[.8rem] transition duration-700 ease-in-out hover:translate-x-1'>
                        <FiBookOpen />
                        Recipes
                    </span>
                </Link>
                <Link
                    href='/nutrispoon'
                    onClick={() => {
                        setMenuClick(null);
                        setActive('Nutrispoon Companion');
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between duration-700 ease-in-out ${
                        active === 'Nutrispoon Companion'
                            ? activeFormat
                            : InactiveFormat
                    }`}
                >
                    <span className='ms-5 flex items-center gap-2 hover:text-indigo-900 text-[.8rem] transition duration-700 ease-in-out hover:translate-x-1'>
                        <FiSlack />
                        Nutrispoon Companion
                    </span>
                </Link>

                {/* Sibling Content */}
                <Link
                    href='#'
                    onClick={() => {
                        setActive('Blog');
                        setMenuClick(null);
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between transition duration-700 ease-in-out ${active === 'Blog' ? activeFormat : InactiveFormat}`}
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiEdit />
                        Blog
                    </span>
                </Link>

                <Link
                    href='#'
                    onClick={() => {
                        setActive('Testimonial');
                        setMenuClick(null);
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between transition duration-700 ease-in-out ${active === 'Testimonial' ? activeFormat : InactiveFormat}`}
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiFileText />
                        Testimonials
                    </span>
                </Link>
                <Link
                    href='/account-setup'
                    onClick={() => {
                        setActive('Company User');
                        setMenuClick(null);
                    }}
                    className={`py-3 rounded-l-md flex items-center justify-between transition duration-700 ease-in-out ${active === 'Company User' ? activeFormat : InactiveFormat}`}
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiUsers />
                        Company User
                    </span>
                </Link>
            </div>
            <div className='flex flex-col text-slate-500 bg-slate-100 h-full'>
                <div className='flex flex-col'>
                    <span className='ms-5 mt-4 font-bold text-sm flex gap-2 items-center'>
                        <MdPrivacyTip /> Data Privavy Policy
                    </span>
                    <span className='ms-5 font-bold text-xs'>
                        SPOON-Seafarers Program
                    </span>
                    <span className='ms-5 font-semibold text-xs'>
                        Onwards to Outstanding Nutrition
                    </span>
                    <span className='ms-5 text-xs'>
                        © 2024 All Rights Reserved
                    </span>
                </div>
                <div className='flex flex-col'>
                    <span className='ms-5 mt-4 font-bold text-sm flex gap-2 items-center'>
                        <RiContactsBookFill />
                        Contact Us @
                    </span>
                    <span className='ms-5 font-bold text-xs'>
                        Email Address:
                    </span>
                    <span className='ms-5 text-xs'>
                        inquiry@spoon.ph
                    </span>
                    <span className='ms-5 text-xs font-bold'>
                        Telephone
                    </span>
                    <span className='ms-5 text-xs'>
                        (049) 508 - 8600
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
