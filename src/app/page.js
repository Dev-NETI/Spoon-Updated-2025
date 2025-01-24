import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/SPOON_3.svg';
import coversrc from '/public/images/cover.png';

export const metadata = {
    title: 'Spoon PH',
};

const Home = () => {
    return (
        <div className='flex flex-col min-h-screen bg-slate-100'>
            {/* Header Section */}
            <div className='flex bg-slate-100 min-h-24 w-full border'>
                <Image
                    className='p-3 lg:ms-80'
                    src={logo}
                    width={200}
                    height='auto'
                    alt='Spoon Logo'
                />
            </div>

            {/* Main Content Section */}
            <div className='flex flex-col lg:flex-row items-center justify-center flex-2 p-5 lg:p-0'>
                {/* Text Section */}
                <div className='p-5 lg:p-10 text-center lg:text-left'>
                    <h2 className='text-lg md:text-2xl font-semibold'>
                        Choose from thousands of recipes
                    </h2>
                    <p className='mt-2 text-sm md:text-base'>
                        Welcome to SPOON, a toolkit to easily visualize the
                        amount of nutrients ingested.
                    </p>
                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <Link
                            href='/login'
                            className='bg-blue-800 w-full md:w-32 h-10 text-white rounded-md hover:bg-blue-900 hover:scale-110 transform transition duration-300 flex items-center justify-center'
                        >
                            Log In
                        </Link>
                        <Link
                            href='/verifying-account'
                            className='bg-blue-800 w-full md:w-32 h-10 text-white rounded-md hover:bg-blue-900 hover:scale-110 transform transition duration-300 flex items-center justify-center'
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Image Section */}
                <div className='p-5 lg:p-10'>
                    <Image
                        className='w-full max-w-sm lg:max-w-lg mx-auto'
                        src={coversrc}
                        height={650}
                        width='auto'
                        alt="Spoon's Cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
