import logo from '../../public/images/spoon_logo.png';
import Image from 'next/image';
const ApplicationLogo = () => (
    <Image src={logo} alt='Spoon Logo' width={150} height='auto' className='w-auto h-auto' priority />
);

export default ApplicationLogo;
