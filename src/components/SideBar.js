import {
    FiChevronRight,
    FiLayers,
    FiBookOpen,
    FiSlack,
    FiEdit,
    FiFileText,
    FiSettings,
    FiLayout,
    FiUsers,
} from 'react-icons/fi';
import Link from 'next/link';
import spoonICO from '/public/images/spoon-logo-full.png';
import logo from '/public/images/spoon-logo-text.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SideBar = ({ isOpen }) => {
    const [isMenuClick, setMenuClick] = useState(null);

    return (
        <div
            className={`top-0 left-0 w-2/12 bg-slate-100 h-full transition-all duration-[900ms] ease-in-out hidden xl:flex flex-col ${
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
                className={`flex flex-col justify-start text-slate-500 ms-8 mt-4 text-sm gap-y-1 transition-all duration-700 delay-600 ease-in-out ${
                    isOpen
                        ? 'translate-x-0 opacity-100'
                        : '-translate-x-1 opacity-0'
                }`}
            >
                <Link
                    href='/recipe'
                    className='py-3 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out hover:translate-x-1'
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiLayers />
                        Dashboard
                    </span>
                </Link>
                <Link
                    href='/recipe'
                    className='bg-slate-200 py-3 rounded-l-md border-r-4 border-indigo-900'
                >
                    <span className='ms-5 flex items-center gap-2 text-indigo-900 font-bold '>
                        <FiBookOpen />
                        Recipes
                    </span>
                </Link>
                <div className='flex flex-col justify-start text-slate-500 text-sm overflow-hidden'>
                    <Link
                        href='/recipe'
                        onClick={() =>
                            setMenuClick(prev =>
                                prev === 'nutrispoon' ? null : 'nutrispoon'
                            )
                        }
                        className={`overflow-y-hidden flex py-3 rounded-l-md items-center justify-between hover:text-indigo-900 transition duration-700 hover:translate-x-1 ${
                            isMenuClick === 'nutrispoon'
                                ? 'bg-slate-200 text-indigo-900 font-semibold'
                                : ''
                        }`}
                    >
                        <span className='ms-5 flex items-center gap-2'>
                            <FiSlack />
                            Nutrispoon Companion
                        </span>
                        <span className='me-2'>
                            <FiChevronRight
                                className={`transition-transform duration-500 ease-in-out ${
                                    isMenuClick === 'nutrispoon'
                                        ? 'rotate-90'
                                        : 'rotate-0'
                                }`}
                            />
                        </span>
                    </Link>

                    <div
                        className={`ms-2 bg-slate-200 overflow-hidden transition-all duration-700 ease-in-out ${
                            isMenuClick === 'nutrispoon'
                                ? 'max-h-[500px] opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                BMI Calculator
                            </span>
                        </Link>
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Calorie Calculator
                            </span>
                        </Link>
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Nutrient Calculator
                            </span>
                        </Link>
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Blood Pressure Tracker
                            </span>
                        </Link>
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                My Ideal Plato
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Sibling Content */}
                <Link
                    href='/'
                    className='bg-slate-100 py-3 rounded-l-md hover:text-indigo-900 transition duration-700 ease-in-out hover:translate-x-1'
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiEdit />
                        Blog
                    </span>
                </Link>

                <Link
                    href='/'
                    className='bg-slate-100 py-3 rounded-l-md hover:text-indigo-900 transition duration-700 hover:translate-x-1'
                >
                    <span className='ms-5 flex items-center gap-2'>
                        <FiFileText />
                        Testimonials
                    </span>
                </Link>
                <div className='flex flex-col justify-start text-slate-500 text-sm overflow-hidden'>
                    <Link
                        href='#'
                        onClick={() =>
                            setMenuClick(prev =>
                                prev === 'maintenance' ? null : 'maintenance'
                            )
                        }
                        className={`py-3 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 hover:translate-x-1 ${
                            isMenuClick === 'maintenance'
                                ? 'bg-slate-200 text-indigo-900 max-height-[500px]'
                                : ''
                        }`}
                    >
                        <span className='ms-5 flex items-center gap-2'>
                            <FiSettings />
                            Maintenance
                        </span>
                        <span className='me-2'>
                            <FiChevronRight
                                className={`transition duration-200 ease-in-out ${isMenuClick === 'maintenance' ? 'rotate-90' : 'rotate-0'}`}
                            />
                        </span>
                    </Link>
                    <div
                        className={`mt-0.5 flex flex-col justify-start ms-2 bg-slate-200 overflow-hidden transition duration-500 ease-in-out ${isMenuClick === 'maintenance' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}
                    >
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiUsers />
                                Company User
                            </span>
                        </Link>
                        <Link
                            href='/recipe'
                            className='py-1 rounded-l-md flex items-center justify-between hover:text-indigo-900 transition duration-700 ease-in-out'
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiUsers />
                                All Users
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
