import React from 'react';

function ViewIndicatorItem({ active = false }) {
    let style = active ? 'bg-blue-600' : 'bg-gray-400';

    return <div className={`col-span-1 rounded-lg py-1 ${style}`} />;
}

export default ViewIndicatorItem;
