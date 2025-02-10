import React from 'react';

function layout({ children }) {
    return (
        <div className='flex flex-col overflow-x-hidden'>
            <div className='flex-1 bg-slate-200'>
                <div className='mx-1 mb-10 flex flex-col gap-2 px-3'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default layout;
