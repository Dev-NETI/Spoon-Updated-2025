import React from 'react';

function layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen overflow-x-hidden'>
            <div className='flex-1 bg-slate-200'>
                <div className='mx-5 mb-10 flex flex-col gap-2 p-3'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default layout;
