import React from 'react';

function CalorieIntakeItem({ description, className, ...props }) {
    return (
        <div className={`${className} flex flex-row p-2 rounded-xl shadow-xl`}>
            <input type='radio' className='mr-2' {...props} />
            <p className='font-bold text-gray-200 text-sm p-2'>{description}</p>
        </div>
    );
}

export default CalorieIntakeItem;
