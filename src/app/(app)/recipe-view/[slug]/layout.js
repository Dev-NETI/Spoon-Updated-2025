import React from 'react';

function layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen bg-gray-100'>
            <main className='flex-1 py-8 px-4 sm:px-6 lg:px-8'>
                <div className='mx-auto max-w-7xl'>{children}</div>
            </main>
        </div>
    );
}

export default layout;
