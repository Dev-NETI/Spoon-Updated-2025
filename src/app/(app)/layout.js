'use client';
import * as React from 'react';
import { useAuth } from '@/hooks/auth';
import Loading from '@/app/(app)/Loading';
import { useEffect, useState } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';

const AppLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useAuth({ middleware: 'auth' });

    if (!user) {
        return <Loading />;
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(isSidebarOpen => !isSidebarOpen);
    };

    return (
        <div className='relative flex min-h-screen bg-gray-100'>
            <SideBar
                isOpen={isSidebarOpen}
                className={`transition-all duration-700 ease-in-out ${
                    isSidebarOpen
                        ? 'translate-x-full'
                        : '-translate-x-full opacity-0'
                }`}
            />

            <div
                className={`flex-1 bg-slate-200 transition-all duration-700 ease-in-out ${
                    isSidebarOpen
                        ? 'translate-x-2'
                        : 'translate-x-0 max-w-[10000px]'
                }`}
            >
                <NavBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

                <div className='p-4'>{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
