// import Image from 'next/image';
// import icon from '../../../public/images/star.png';
import AuthCardHeader from './AuthCardHeader';
const AuthCard = ({ logo, children, title }) => (
    <div className='min-h-screen flex flex-col md:flex-col lg:flex-col items-center lg:justify-center bg-blue-800 p-4 relative'>
        <div className='absolute top-0 right-0 z-49'>
            {/* <Image src={icon} alt='bg_star' priority /> */}
        </div>
        {logo}
        <div className='w-full max-w-md mt-4 bg-white shadow-lg border animate-fade-up animate-once animate-duration-1000 rounded-lg'>
            <AuthCardHeader title={title} />
            <div className='p-10 flex flex-col'>{children}</div>
        </div>
    </div>
);

export default AuthCard;
