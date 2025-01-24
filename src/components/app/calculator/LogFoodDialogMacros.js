import React from 'react';

function LogFoodDialogMacros({ value, title }) {
    return (
        <div className='flex flex-col justify-center items-center '>
            <h1 className='text-stone-800 text-xl font-semibold'>{value}</h1>
            <h1 className='text-stone-800 text-sm italic '>{title}</h1>
        </div>
    );
}

export default LogFoodDialogMacros;
