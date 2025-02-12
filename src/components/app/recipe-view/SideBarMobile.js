import spoonICO from '/public/images/spoon-logo-full.png';
import logo from '/public/images/spoon-logo-text.png';
import Image from 'next/image';
import {
    FiChevronRight,
    FiLayers,
    FiBookOpen,
    FiSlack,
    FiLayout,
    FiArrowLeft,
} from 'react-icons/fi';
import Link from 'next/link';

export default function SideBarMobile() {
    return (
        <div className='absolute xl:hidden top-0 z-[110] min-h-full max-h-screen min-w-full bg-slate-950 bg-opacity-50 transition-all duration-300 ease-in-out translate-x-.5'>
            <div className='sticky h-screen top-0 bg-slate-100 w-3/5 flex flex-col'>
                <div className='flex items-center justify-between p-1 border-b border-slate-200 h-20'>
                    <div className='flex items-center'>
                        <Image
                            src={spoonICO}
                            className={`h-12 w-12 transition duration-1000 ease-in-out transform`}
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
                    <div className='text-3xl pe-2 text-blue-900'>
                        <FiArrowLeft />
                    </div>
                </div>
                <div
                    className={`flex flex-col justify-start text-slate-500 gap-y-1 transition-all duration-700 delay-600 ease-in-out text-[1rem]`}
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
                    <div className='flex flex-col justify-start text-slate-500 text-[.7rem] overflow-hidden'>
                        <Link
                            href='/recipe'
                            className={`overflow-y-hidden flex py-3 rounded-l-md items-center justify-between hover:text-indigo-900 transition duration-700 hover:translate-x-1`}
                        >
                            <span className='ms-5 flex items-center gap-2'>
                                <FiSlack />
                                Nutrispoon Companion
                            </span>
                            <span className='me-2'>
                                <FiChevronRight
                                    className={`transition-transform duration-500 ease-in-out`}
                                />
                            </span>
                        </Link>

                        <div
                            className={`ms-2 bg-slate-200 overflow-hidden transition-all duration-700 ease-in-out `}
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
                </div>
            </div>
        </div>
    );
}
