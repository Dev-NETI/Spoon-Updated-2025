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
                className={`flex flex-col justify-start text-slate-500 ms-5 mt-4 text-[.8rem] gap-y-1 transition-all duration-700 delay-600 ease-in-out ${
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
                        active === 'Recipes' || active === 'Spoon PH' ? activeFormat : InactiveFormat
                    }`}
                >
                    <span className='ms-5 flex items-center gap-2 hover:text-indigo-900 text-[.8rem] transition duration-700 ease-in-out hover:translate-x-1'>
                        <FiBookOpen />
                        Recipes
                    </span>
                </Link>
                <div className='flex flex-col justify-start text-slate-500 text-[.8rem] overflow-hidden'>
                    <div
                        onClick={() => {
                            setMenuClick(prev =>
                                prev === 'nutrispoon' ? null : 'nutrispoon'
                            );
                        }}
                        className={`overflow-y-hidden flex py-3 rounded-l-md items-center justify-between transition duration-700 ${
                            isMenuClick === 'nutrispoon'
                                ? 'bg-slate-200 text-indigo-900 font-semibold translate-x-1'
                                : 'hover:translate-x-1 hover:text-indigo-900'
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
                    </div>

                    <div
                        className={`ms-2 bg-slate-200 overflow-hidden transition-all duration-700 ease-in-out ${
                            isMenuClick === 'nutrispoon'
                                ? 'max-h-[500px] opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <Link
                            href='/calculator/bmi'
                            onClick={() => {
                                setActive('BMI Calculator');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between text-[.8rem] transition duration-700 ease-in-out ${active === 'BMI Calculator' ? activeFormat : InactiveFormat}`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                BMI Calculator
                            </span>
                        </Link>
                        <Link
                            href='#'
                            onClick={() => {
                                setActive('Calorie Calculator');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between text-[.8rem] transition duration-700 ease-in-out ${active === 'Calorie Calculator' ? activeFormat : InactiveFormat}`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Calorie Calculator
                            </span>
                        </Link>
                        <Link
                            href='#'
                            onClick={() => {
                                setActive('Nutrient Calculator');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between text-[.8rem] transition duration-700 ease-in-out ${active === 'Nutrient Calculator' ? activeFormat : InactiveFormat}`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Nutrient Calculator
                            </span>
                        </Link>
                        <Link
                            href='#'
                            onClick={() => {
                                setActive('Blood Pressure Tracker');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between text-[.8rem] transition duration-700 ease-in-out ${active === 'Blood Pressure Tracker' ? activeFormat : InactiveFormat}`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiLayout />
                                Blood Pressure Tracker
                            </span>
                        </Link>
                        <Link
                            href='#'
                            onClick={() => {
                                setActive('My Ideal Plato');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between text-[.8rem] transition duration-700 ease-in-out ${active === 'My Ideal Plato' ? activeFormat : InactiveFormat}`}
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
                <div className='flex flex-col justify-start text-slate-500 text-[.8rem] overflow-hidden'>
                    <Link
                        href='#'
                        onClick={() => {
                            setMenuClick(prev =>
                                prev === 'maintenance' ? null : 'maintenance'
                            );
                        }}
                        className={`py-3 rounded-l-md flex items-center justify-between transition duration-700 ${
                            isMenuClick === 'maintenance'
                                ? 'bg-slate-200 text-indigo-900 max-height-[500px] font-semibold translate-x-1'
                                : 'hover:translate-x-1 hover:text-indigo-900'
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
                            href='#'
                            onClick={() => {
                                setActive('Company User');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between transition duration-700 ease-in-out ${active === 'Company User' ? activeFormat : InactiveFormat}`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiUsers />
                                Company User
                            </span>
                        </Link>
                        <Link
                            href='#'
                            onClick={() => {
                                setActive('All Users');
                            }}
                            className={`py-1 rounded-l-md flex items-center justify-between transition duration-700 ease-in-out ${active === 'All Users' ? activeFormat : InactiveFormat}`}
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
