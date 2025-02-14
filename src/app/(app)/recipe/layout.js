import React from 'react';

function layout({ children }) {
    return (
        <div className='flex flex-col overflow-x-hidden p-4'>
            <div className='mx-1 mb-10 flex flex-col gap-2 flex-1 bg-slate-200'>
                {children}
            </div>
        </div>
    );
}

export default layout;
