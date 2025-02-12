'use client';
import * as React from 'react';
import { useAuth } from '@/hooks/auth';
import Loading from '@/app/(app)/Loading';
import { useState } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';
import SideBarMobile from '@/components/app/recipe-view/SideBarMobile';

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth({ middleware: 'auth' });

    if (!user) {
        return <Loading />;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className='relative flex min-h-screen max-w-full bg-gray-100'>
            {/* <SideBarMobile /> */}
            <SideBar
                isOpen={isSidebarOpen}
                className={`transition-all duration-700 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            />

            <div
                className={`flex-1 bg-slate-200 transition-all duration-700 ease-in-out ${
                    isSidebarOpen ? 'xl:translate-x-2' : 'xl:translate-x-0'
                }`}
            >
                <NavBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

                <div className='p-4 min-w-full'>{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
