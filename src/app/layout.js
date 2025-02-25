import { Nunito } from 'next/font/google';
import '@/app/global.css';
const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
});

const RootLayout = ({ children }) => {
    return (
        <html lang='en' className={nunitoFont.className}>
            <body className='antialiased overflow-x-hidden'>{children}</body>
        </html>
    );
};

export const metadata = {
    title: 'SPOON.PH',
};

export default RootLayout;
